// 页面加载完成后的交互效果
document.addEventListener('DOMContentLoaded', function() {
    const welcomeCard = document.querySelector('.welcome-card');
    
    // 添加鼠标悬停效果
    welcomeCard.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    welcomeCard.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // 添加点击效果
    welcomeCard.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    console.log('欢迎页面已加载！');
});
