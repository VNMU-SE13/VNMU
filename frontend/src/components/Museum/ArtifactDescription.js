import React, { useRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FullPageLoading from "../common/FullPageLoading";


// Styled Components
const ArtifactContainer = styled.div`
  font-size: 16px;
  margin-top: 15px;
  color: #444;
  line-height: 1.6;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
  margin-right: 10px;
`;

const PodcastButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DescriptionText = styled.p`
  margin-bottom: 15px;
`;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableCell = styled.td`
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const LabelCell = styled(TableCell)`
  font-weight: bold;
  color: #333;
`;

const ValueCell = styled(TableCell)`
  color: #ff5722;
`;

const ArtifactDescription = ({artifact}) => {
  const synthRef = useRef(window.speechSynthesis);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate()
  const [loading, setLoading] = useState()

  const [translatedName, setTranslatedName] = useState(artifact.artifactName);
  const [translatedDesc, setTranslatedDesc] = useState(artifact.description);
  const [translatedDetails, setTranslatedDetails] = useState([ { label: "Năm sản xuất", value: artifact.dateDiscovered },
    { label: "Chiều dài", value: artifact.dimenson },
    { label: "Cân nặng", value: artifact.weight },
    { label: "Vật liệu", value: artifact.material },
    { label: "Tình trạng", value: artifact.condition }]);

  useEffect(() => {
    const translateArtifact = async () => {
      if (language === "vi") {
        setTranslatedName(artifact.artifactName);
        setTranslatedDesc(artifact.description);
        setTranslatedDetails([ { label: "Năm sản xuất", value: artifact.dateDiscovered },
          { label: "Chiều dài", value: artifact.dimenson },
          { label: "Cân nặng", value: artifact.weight },
          { label: "Vật liệu", value: artifact.material },
          { label: "Tình trạng", value: artifact.condition }]);
      } else {
        const name = await translateText(artifact.artifactName, language);
        const descs = await translateText(artifact.description, language)
        const details = await Promise.all(
          translatedDetails.map(async (item) => {
            const label = await translateText(item.label, language);
            const value = await translateText(item.value, language);
            return { label, value };
          })
        );

        setTranslatedName(name);
        setTranslatedDesc(descs);
        setTranslatedDetails(details);
      }
    };

    translateArtifact();
  }, [language]);

  const handleUpgrade = async () => {
    const successUrl = "http://localhost:3000/payment-success";
    const cancelUrl = "http://localhost:3000/";
    try {
      setLoading(true)
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/PayOs/create-payment?successUrl=${encodeURIComponent(successUrl)}&cancelUrl=${encodeURIComponent(cancelUrl)}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.status === 200 && res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl; // Điều hướng tới trang thanh toán
      }
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false)
    }
  };

  const speakDescription = () => {
    const synth = synthRef.current;
    if (!localStorage.getItem('token')) {
          Swal.fire({
            icon: 'warning',
            title: 'Vui lòng đăng nhập',
            text: 'Bạn chưa đăng nhập.',
            confirmButtonText: 'Đăng nhập ngay!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login');
            }
          });
          return;
    } 

    if (!localStorage.getItem('isPremium') || localStorage.getItem('isPremium')=='false') {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng thử lại',
        text: 'Bạn chưa phải là hội viên!',
        confirmButtonText: 'Nâng cấp hội viên ngay'
      }).then((result) => {
        if (result.isConfirmed) {
          handleUpgrade()
        }
      });
      return;
    } 

    if (!localStorage.getItem('token')) {
          Swal.fire({
            icon: 'warning',
            title: 'Vui lòng đăng nhập',
            text: 'Bạn chưa đăng nhập.',
            confirmButtonText: 'Đăng nhập ngay!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login');
            }
          });
          return;
    } 
    
    if (synth.speaking) {
      synth.cancel();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      artifact.description
    );
    utterance.lang = "vi-VN";
    utterance.rate = 1;
    synth.speak(utterance);
  };

  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <ArtifactContainer>
      <TitleRow>
        <Title>{artifact.artifactName}</Title>
        <PodcastButton onClick={speakDescription}>Podcast</PodcastButton>
      </TitleRow>

        <DescriptionText>{translatedDesc}</DescriptionText>

      {/* <DetailsTable>
        <tbody>
          {translatedDetails.map((detail, index) => (
            <tr key={index}>
              <LabelCell>{detail.label}</LabelCell>
              <ValueCell>{detail.value}</ValueCell>
            </tr>
          ))}
        </tbody>
      </DetailsTable> */}
    </ArtifactContainer>
  );
};

export default ArtifactDescription;
