// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // モバイルメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いている場合は閉じる
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // ヘッダーのスクロール制御
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール方向に応じてヘッダーの表示/非表示を制御
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下スクロール時はヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上スクロール時はヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // スクロール位置に応じてヘッダーの背景を調整
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // EmailJS初期化
    emailjs.init("8uXJC6i6PJ06O-6tE");
    
    // お問い合わせフォームの処理
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // 簡単なバリデーション
            if (!name || !email || !subject || !message) {
                alert('すべての項目を入力してください。');
                return;
            }
            
            // 送信ボタンの状態を変更
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '送信中...';
            submitButton.disabled = true;
            
            // EmailJSでメール送信
            const templateParams = {
                to_name: "Serendipity-Works",
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: "yk.nnno@gmail.com"
            };
            
            emailjs.send('service_lkzpe7s', 'template_9i198uz', templateParams)
                .then(function(response) {
                    alert('お問い合わせを送信しました。ありがとうございます。');
                    
                    // フォームをリセット
                    contactForm.reset();
                    
                    // ボタンを元の状態に戻す
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, function(error) {
                    alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
                    
                    // ボタンを元の状態に戻す
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }
    
    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animatedElements = document.querySelectorAll('.section-header, .about-text, .company-info, .serendipity-section, .service-content, .philosophy-content, .contact-content');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[src^="https://"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    // ページトップへのスクロールボタン（オプション）
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-gold);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // スクロール位置に応じてボタンの表示/非表示を制御
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
    
    // トップへスクロール
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ホバー効果
    scrollToTopButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--dark-gold)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-gold)';
        this.style.transform = 'scale(1)';
    });
});

// ページ読み込み時のアニメーション
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // ローディングアニメーション（オプション）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// リサイズ時の処理
window.addEventListener('resize', function() {
    // モバイルメニューが開いている状態でリサイズされた場合の処理
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
