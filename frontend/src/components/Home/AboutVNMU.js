import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header'; // giữ nguyên Header layout

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  padding: 120px 80px 40px 80px;
  background-color: #fdfcf8;
  color: #333;
  animation: ${fadeIn} 0.6s ease;
  font-family: 'Segoe UI', sans-serif;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  color: #1d1d1d;
  margin-bottom: 40px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 12px;
`;

const Section = styled.div`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 16px;
  color: #2c2c2c;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    display: block;
    width: 40%;
    height: 3px;
    background-color: #b59a5b;
    margin-top: 6px;
    border-radius: 2px;
  }
`;

const SectionContent = styled.p`
  font-size: 16px;
  line-height: 1.7;
  text-align: justify;
  color: #444;
`;

const AboutVNMU = () => {
  return (
    <>
      <Header /> {/* Component Header đã import từ bên ngoài */}
      <PageContainer>
        <PageTitle>Về Chúng Tôi – VNMU</PageTitle>

        <Section>
          <SectionTitle>Bộ máy tổ chức</SectionTitle>
          <SectionContent>
            Dự án VNMU được vận hành bởi một nhóm gồm 5 thành viên: Nguyễn Quang Tiên, Nguyễn Hứa Thọ, Trần Mậu Cao Thanh, Lê Anh Tú và Nguyễn Quang Đăng Khoa. Chúng tôi cùng chia sẻ chung một niềm đam mê với lịch sử và khát vọng lan tỏa giá trị lịch sử dân tộc đến giới trẻ thông qua nền tảng công nghệ hiện đại.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Lịch sử phát triển</SectionTitle>
          <SectionContent>
            VNMU ra đời trong bối cảnh nhu cầu học tập lịch sử theo hướng trực quan, sống động ngày càng lớn. Từ những ngày đầu thai nghén ý tưởng, nhóm phát triển đã tiến hành khảo sát người học và các bảo tàng tại Đà Nẵng để xây dựng một nền tảng học lịch sử thông qua hiện vật – thứ mang tính biểu tượng và cảm xúc mạnh mẽ nhất. Qua từng giai đoạn, hệ thống đã được cải tiến và tối ưu để phù hợp hơn với trải nghiệm người dùng.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Tầm nhìn & Sứ mệnh</SectionTitle>
          <SectionContent>
            VNMU đặt mục tiêu trở thành nền tảng học lịch sử hiện vật hàng đầu tại Việt Nam, nơi mà mọi người – đặc biệt là giới trẻ – có thể “sống cùng lịch sử” thay vì chỉ học thuộc lòng. Chúng tôi tin rằng: mỗi hiện vật đều mang một câu chuyện, và mỗi câu chuyện xứng đáng được kể lại bằng công nghệ, bằng cảm xúc và bằng sự tự hào dân tộc.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Chức năng & Nhiệm vụ</SectionTitle>
          <SectionContent>
            Nền tảng VNMU cung cấp nhiều chức năng như: tra cứu thông tin hiện vật lịch sử, xem video tương tác, học qua dòng thời gian, tham gia đố vui, và cập nhật tin tức sự kiện từ các bảo tàng tại Đà Nẵng. Hệ thống đồng thời hỗ trợ quảng bá giá trị văn hóa – lịch sử Việt Nam ra cộng đồng, thúc đẩy giáo dục lịch sử gắn với chuyển đổi số.
          </SectionContent>
        </Section>
      </PageContainer>
    </>
  );
};

export default AboutVNMU;
