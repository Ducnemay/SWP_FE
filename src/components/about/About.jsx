import React from "react";
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="image-container">
                <img src="vet.jpg" alt="Vet" />
            </div>
            <div className="description-container">
                <h2>Vẹt</h2>
                <p>Vẹt là một loài chim thuộc họ Psittacidae, nổi tiếng với khả năng nói chuyện và nhại tiếng người. Chúng có kích thước nhỏ đến trung bình, lông rực rỡ và đa màu sắc. Vẹt sống chủ yếu ở khu rừng nhiệt đới và có khả năng học hỏi từ và cụm từ. Chúng sống thành đàn và có khả năng giao tiếp xã hội. Tuy nhiên, môi trường sống của vẹt đang bị đe dọa do mất môi trường và săn bắn trái phép. Việc bảo vệ và duy trì môi trường sống của vẹt là rất quan trọng để đảm bảo sự tồn tại của chúng trong tương lai.</p>
            </div>
        </div>
    )
}

export default About;