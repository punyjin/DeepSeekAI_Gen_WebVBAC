document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Sticky Header
    const header = document.querySelector('.sticky-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            }
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Initialize counters when section is in view
    const aboutSection = document.querySelector('.about-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);

    // Programs Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programCards = [
        {
            id: 1,
            title: 'หลักสูตรประถมศึกษา',
            description: 'การเรียนการสอนที่เน้นพัฒนาการรอบด้านสำหรับเด็กประถม',
            level: 'primary',
            image: 'images/program1.jpg'
        },
        {
            id: 2,
            title: 'หลักสูตรมัธยมต้น',
            description: 'เตรียมความพร้อมสู่ระดับมัธยมศึกษาตอนปลาย',
            level: 'secondary',
            image: 'images/program2.jpg'
        },
        {
            id: 3,
            title: 'หลักสูตรมัธยมปลาย',
            description: 'เตรียมความพร้อมสู่ระดับอุดมศึกษา',
            level: 'secondary',
            image: 'images/program3.jpg'
        },
        {
            id: 4,
            title: 'หลักสูตรวิทยาศาสตร์',
            description: 'สำหรับนักเรียนที่มีความสนใจด้านวิทยาศาสตร์',
            level: 'special',
            image: 'images/program4.jpg'
        },
        {
            id: 5,
            title: 'หลักสูตรศิลปะและการแสดง',
            description: 'พัฒนาทักษะด้านศิลปะและการแสดง',
            level: 'special',
            image: 'images/program5.jpg'
        },
        {
            id: 6,
            title: 'หลักสูตรกีฬา',
            description: 'สำหรับนักเรียนที่มีความสามารถด้านกีฬา',
            level: 'special',
            image: 'images/program6.jpg'
        }
    ];

    const programsGrid = document.querySelector('.programs-grid');
    
    function renderPrograms(filter = 'all') {
        programsGrid.innerHTML = '';
        
        const filteredPrograms = filter === 'all' 
            ? programCards 
            : programCards.filter(program => program.level === filter);
        
        filteredPrograms.forEach(program => {
            const programCard = document.createElement('div');
            programCard.className = `program-card ${program.level}`;
            programCard.innerHTML = `
                <img src="${program.image}" alt="${program.title}">
                <div class="program-card-content">
                    <span class="level ${program.level}">${program.level === 'primary' ? 'ประถม' : program.level === 'secondary' ? 'มัธยม' : 'พิเศษ'}</span>
                    <h3>${program.title}</h3>
                    <p>${program.description}</p>
                    <a href="#" class="btn btn-primary">ดูรายละเอียด</a>
                </div>
            `;
            programsGrid.appendChild(programCard);
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderPrograms(filter);
        });
    });
    
    // Initialize programs
    renderPrograms();

    // Activities Slider
    const activities = [
        {
            id: 1,
            title: 'กิจกรรมวันวิทยาศาสตร์',
            date: '18 สิงหาคม 2566',
            description: 'กิจกรรมส่งเสริมการเรียนรู้ด้านวิทยาศาสตร์และเทคโนโลยี',
            image: 'images/activity1.jpg'
        },
        {
            id: 2,
            title: 'ค่ายภาษาอังกฤษ',
            date: '25-27 สิงหาคม 2566',
            description: 'ค่ายพัฒนาทักษะภาษาอังกฤษกับครูเจ้าของภาษา',
            image: 'images/activity2.jpg'
        },
        {
            id: 3,
            title: 'การแข่งขันกีฬาสี',
            date: '15 กันยายน 2566',
            description: 'กิจกรรมส่งเสริมสุขภาพและความสามัคคี',
            image: 'images/activity3.jpg'
        },
        {
            id: 4,
            title: 'ทัศนศึกษา',
            date: '30 กันยายน 2566',
            description: 'ศึกษานอกสถานที่เพื่อเสริมสร้างประสบการณ์การเรียนรู้',
            image: 'images/activity4.jpg'
        }
    ];

    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    activities.forEach(activity => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <div class="slide-content">
                <img src="${activity.image}" alt="${activity.title}">
                <div class="slide-info">
                    <h3>${activity.title}</h3>
                    <div class="date">${activity.date}</div>
                    <p>${activity.description}</p>
                    <a href="#" class="btn btn-primary">ดูรายละเอียด</a>
                </div>
            </div>
        `;
        sliderContainer.appendChild(slide);
    });
    
    const activitiesSlider = document.querySelector('.activities-slider');
    activitiesSlider.insertBefore(sliderContainer, activitiesSlider.firstChild);
    
    // Add slider dots
    const sliderNav = document.createElement('div');
    sliderNav.className = 'slider-nav';
    
    activities.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        sliderNav.appendChild(dot);
    });
    
    activitiesSlider.appendChild(sliderNav);
    
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(index) {
        sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);

    // News Ticker
    const newsTicker = [
        { text: 'รับสมัครนักเรียนใหม่ปีการศึกษา 2567 เริ่ม 1 มกราคม 2567', type: 'announcement' },
        { text: 'โรงเรียนได้รับรางวัลโรงเรียนดีเด่นระดับประเทศ', type: 'award' },
        { text: 'ปิดเทอมภาคฤดูร้อน 1-30 เมษายน 2567', type: 'holiday' },
        { text: 'ประกาศผลสอบกลางภาค 2/2566 วันศุกร์ที่ 10 พฤศจิกายน', type: 'exam' }
    ];

    const tickerContent = document.querySelector('.ticker-content');
    
    newsTicker.forEach(item => {
        const tickerItem = document.createElement('div');
        tickerItem.className = 'ticker-item';
        tickerItem.innerHTML = `
            <span>${item.type === 'announcement' ? '📢' : item.type === 'award' ? '🏆' : item.type === 'holiday' ? '✈️' : '📝'}</span>
            ${item.text}
        `;
        tickerContent.appendChild(tickerItem);
    });

    // News Cards
    const news = [
        {
            id: 1,
            title: 'นักเรียนคว้าแชมป์การแข่งขันคณิตศาสตร์ระดับประเทศ',
            date: '15 ตุลาคม 2566',
            summary: 'นักเรียนชั้นมัธยมศึกษาปีที่ 5 คว้ารางวัลชนะเลิศการแข่งขันคณิตศาสตร์โอลิมปิกระดับประเทศ',
            image: 'images/news1.jpg'
        },
        {
            id: 2,
            title: 'โครงการแลกเปลี่ยนนักเรียนกับประเทศญี่ปุ่น',
            date: '5 ตุลาคม 2566',
            summary: 'โรงเรียนร่วมมือกับโรงเรียนในประเทศญี่ปุ่นจัดโครงการแลกเปลี่ยนวัฒนธรรม',
            image: 'images/news2.jpg'
        },
        {
            id: 3,
            title: 'อบรมครูเรื่องเทคนิคการสอนแบบ Active Learning',
            date: '28 กันยายน 2566',
            summary: 'คณะครูเข้าร่วมการอบรมเพื่อพัฒนาทักษะการสอนสมัยใหม่',
            image: 'images/news3.jpg'
        }
    ];

    const newsGrid = document.querySelector('.news-grid');
    
    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="news-card-content">
                <div class="date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="#" class="read-more">อ่านต่อ <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }
        
        // Simulate form submission
        alert('ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับคุณเร็วๆนี้');
        contactForm.reset();
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input').value;
        
        if (!email) {
            alert('กรุณากรอกอีเมล');
            return;
        }
        
        alert(`ขอบคุณที่สมัครรับข่าวสารจากเรา! เราจะส่งข้อมูลไปยัง ${email}`);
        this.reset();
    });

    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    scrollReveal.reveal('.section-title, .about-card, .program-card, .news-card, .info-card', { 
        interval: 200 
    });
});