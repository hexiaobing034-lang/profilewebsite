document.addEventListener('DOMContentLoaded', function() {
    // 获取所有视频卡片
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('video-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeButton = document.getElementById('close-button');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');

    // 视频卡片点击事件
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.dataset.video;
            const videoTitle = this.querySelector('.video-title').textContent;
            
            // 设置模态框内容
            modalVideo.src = videoSrc;
            modalTitle.textContent = videoTitle;
            
            // 显示模态框
            videoModal.classList.add('active');
            
            // 自动播放视频
            setTimeout(() => {
                modalVideo.play().catch(e => console.log('Auto-play blocked:', e));
            }, 300);
            
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭模态框
    function closeModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // 创建气泡效果
    function createBubbles() {
        const heroSection = document.querySelector('.hero-section');
        const bubbleCount = 15;

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // 随机大小
            const size = Math.random() * 30 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // 随机位置
            bubble.style.left = `${Math.random() * 100}%`;
            
            // 随机动画时长
            const duration = Math.random() * 8 + 10;
            bubble.style.animationDuration = `${duration}s`;
            
            // 随机延迟
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            heroSection.appendChild(bubble);
        }
    }

    // 初始化气泡效果
    createBubbles();

    // 开场视频自动播放处理
    const heroVideo = document.getElementById('hero-video');
    
    heroVideo.addEventListener('loadedmetadata', function() {
        this.volume = 0.5;
    });

    // 页面滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
        }
    });

    // 平滑滚动到作品集区域
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const portfolioSection = document.querySelector('.portfolio-section');
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 技能卡片交互效果
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // 鼠标移动时的光效跟随
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.skill-pulse');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });
        
        // 鼠标离开时恢复原位
        card.addEventListener('mouseleave', function() {
            const glow = card.querySelector('.skill-pulse');
            if (glow) {
                glow.style.left = '';
                glow.style.top = '20px';
                glow.style.right = '20px';
            }
        });
    });

    // 滚动时的渐入动画
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 技能卡片依次出现
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        // 初始隐藏技能卡片
        const cards = aboutSection.querySelectorAll('.skill-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        observer.observe(aboutSection);
    }

    // 个人介绍区域的粒子效果
    function createParticles() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机大小
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机位置
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // 随机动画时长
            const duration = Math.random() * 6 + 4;
            particle.style.animationDuration = `${duration}s`;
            
            // 随机延迟
            particle.style.animationDelay = `${Math.random() * 3}s`;
            
            aboutSection.appendChild(particle);
        }
    }

    createParticles();

    // 文档预览功能
    const docCards = document.querySelectorAll('.doc-card');
    const docModal = document.getElementById('doc-modal');
    const docModalOverlay = document.getElementById('doc-modal-overlay');
    const docCloseButton = document.getElementById('doc-close-button');
    const docModalTitle = document.getElementById('doc-modal-title');
    const docIframe = document.getElementById('doc-iframe');

    docCards.forEach(card => {
        card.addEventListener('click', function() {
            const docSrc = this.dataset.doc;
            const docTitle = this.dataset.title;
            
            if (docSrc.endsWith('.docx')) {
                const link = document.createElement('a');
                link.href = docSrc;
                link.download = docTitle + '.docx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }
            
            docModalTitle.textContent = docTitle;
            docIframe.src = docSrc;
            
            docModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeDocModal() {
        docModal.classList.remove('active');
        docIframe.src = '';
        document.body.style.overflow = '';
    }

    docCloseButton.addEventListener('click', closeDocModal);
    docModalOverlay.addEventListener('click', closeDocModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && docModal.classList.contains('active')) {
            closeDocModal();
        }
    });

    // 简历预览功能
    const cvLink = document.getElementById('cv-link');
    if (cvLink) {
        cvLink.addEventListener('click', function() {
            docModalTitle.textContent = '个人简历';
            const timestamp = new Date().getTime();
            docIframe.src = `assets/docs/cv.html?timestamp=${timestamp}`;
            
            docModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});
