document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------
    // 0. Hamburger Menu Functionality (قائمة الهامبرجر)
    // ------------------------------------------
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ------------------------------------------
    // 0.5. Beneficiaries Counter (عداد المستفيدين)
    // ------------------------------------------
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
    
    function updateCounter(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue < targetValue) {
            const increment = Math.ceil((targetValue - currentValue) / 20);
            const newValue = Math.min(currentValue + increment, targetValue);
            element.textContent = formatNumber(newValue);
            setTimeout(() => updateCounter(element, targetValue), 50);
        } else {
            element.textContent = formatNumber(targetValue);
        }
    }
    
    // Load counters from localStorage or initialize
    const cardLinks = document.querySelectorAll('[data-card-link]');
    cardLinks.forEach(link => {
        const cardType = link.getAttribute('data-card-link');
        const countElement = document.querySelector(`[data-card="${cardType}"]`);
        
        if (countElement) {
            // Get count from localStorage or initialize
            let count = parseInt(localStorage.getItem(`card_${cardType}_count`)) || 0;
            
            // Increment count when link is clicked
            link.addEventListener('click', function() {
                count++;
                localStorage.setItem(`card_${cardType}_count`, count.toString());
                updateCounter(countElement, count);
            });
            
            // Display current count
            updateCounter(countElement, count);
        }
    });
    
    // ------------------------------------------
    // 1. Language Toggle Functionality (التحكم باللغة)
    // ------------------------------------------

    const langBtn = document.getElementById('lang-btn');
    const htmlElement = document.documentElement;

    // Complete translations for the entire website
    const translations = {
        ar: {
            'nav-home': 'الرئيسية',
            'nav-programs': 'برامج ابطالنا',
            'nav-guidance': 'خدمات الأرشاد الأسري',
            'nav-support': 'خدمات الدعم',
            'nav-about': 'من نحن',
            'nav-subscriptions': 'الإشتراكات',
            'nav-contact': 'تواصل معنا',
            'nav-faq': 'س و ج',
            'auth-login': 'تسجيل الدخول',
            'auth-subscribe': 'اشترك الآن',
            'hero-title': 'منصة مصر التعليمية',
            'hero-description': 'تسعى إلى بناء جيل متكامل في علمه وسلوكه، يمتلك مهارات التفكير والتحليل والاتصال، ويتسم بالأدب والاحترام والمسؤولية، جيل ينهل من العلم بوعي، ويكتسب الأخلاق بالسلوك، ليكون نموذجًا لـ "الجيل المستقبلي المصري الواعد ...',
            'section-title': 'مجالات البرامج التعليمية',
            'card-behavior-title': 'مجال السلوك والقيم',
            'card-behavior-text': 'مجال تنمية السلوك، والذوق والقيم القائمة على المهارات من خلال تعليم المهارات السلوكية والاجتماعية التي تخدم دور الوالدين والمدارس وأيضاً القيم والذوق العام والتعاملات الاجتماعية.',
            'card-cognitive-title': 'مجال تنمية المهارات المعرفية',
            'card-cognitive-text': 'يهتم هذا المحور في تنمية المهارات الأكاديمية ومهارات التفكير والتحليل وحل المشكلات والقدرة على الفهم والاستيعاب، وإدارة الوقت والمهام.',
            'card-language-title': 'مجال اللغة والتخاطب',
            'card-language-text': 'يهتم هذا المحور على النمو اللغوي الصحيح والدقيق والقدرة على تنمية مهارات التعبير والاتصال والتواصل لدى أبنائنا.',
            'card-academic-title': 'مجال المهارات الأكاديمية',
            'card-academic-text': 'يهتم المحور الأكاديمي على النمو في الجانب التعليمي والمهني، أي تنمية مهارات التعليم والقراءة والكتابة والحساب والمواد التعليمية المختلفة.',
            'card-programs': 'عدد البرامج:',
            'card-beneficiaries': 'عدد المستفيدين:',
            'card-more': 'المزيد',
            'dropdown-behavior-title': 'مجال السلوك والقيم',
            'dropdown-behavior-desc': 'تنمية السلوك والذوق والقيم',
            'dropdown-cognitive-title': 'مجال المهارات المعرفية',
            'dropdown-cognitive-desc': 'التفكير والتحليل وحل المشكلات',
            'dropdown-language-title': 'مجال اللغة والتخاطب',
            'dropdown-language-desc': 'النمو اللغوي والتعبير والاتصال',
            'dropdown-academic-title': 'مجال المهارات الأكاديمية',
            'dropdown-academic-desc': 'القراءة والكتابة والحساب',
            'contact-email': 'E-mail: info@egyedu.com',
            'contact-phone': 'Contact: 002 0123456789',
            'contact-address': 'Address: Cairo, Egypt'
        },
        en: {
            'nav-home': 'Home',
            'nav-programs': 'Our Heroes Programs',
            'nav-guidance': 'Family Guidance Services',
            'nav-support': 'Support Services',
            'nav-about': 'About Us',
            'nav-subscriptions': 'Subscriptions',
            'nav-contact': 'Contact Us',
            'nav-faq': 'FAQ',
            'auth-login': 'Login',
            'auth-subscribe': 'Subscribe Now',
            'hero-title': 'Egypt Education Platform',
            'hero-description': 'We strive to build a generation that is complete in its knowledge and behavior, possessing skills of thinking, analysis and communication, characterized by politeness, respect and responsibility, a generation that draws from science consciously, and acquires ethics through behavior, to be a model for "the promising future Egyptian generation..."',
            'section-title': 'Educational Program Areas',
            'card-behavior-title': 'Behavior and Values Domain',
            'card-behavior-text': 'A field for developing behavior, taste and values based on skills through teaching behavioral and social skills that serve the role of parents and schools, as well as values, public taste and social interactions.',
            'card-cognitive-title': 'Cognitive Skills Development Domain',
            'card-cognitive-text': 'This axis focuses on developing academic skills, thinking, analysis and problem-solving skills, and the ability to understand and comprehend, as well as time and task management.',
            'card-language-title': 'Language and Communication Domain',
            'card-language-text': 'This axis focuses on correct and accurate linguistic development and the ability to develop expression, communication and interaction skills in our children.',
            'card-academic-title': 'Academic Skills Domain',
            'card-academic-text': 'The academic axis focuses on growth in the educational and professional aspect, i.e., developing teaching skills, reading, writing, arithmetic and various educational materials.',
            'card-programs': 'Number of Programs:',
            'card-beneficiaries': 'Number of Beneficiaries:',
            'card-more': 'More',
            'dropdown-behavior-title': 'Behavior and Values Domain',
            'dropdown-behavior-desc': 'Developing behavior, taste and values',
            'dropdown-cognitive-title': 'Cognitive Skills Domain',
            'dropdown-cognitive-desc': 'Thinking, analysis and problem solving',
            'dropdown-language-title': 'Language and Communication Domain',
            'dropdown-language-desc': 'Linguistic development, expression and communication',
            'dropdown-academic-title': 'Academic Skills Domain',
            'dropdown-academic-desc': 'Reading, writing and arithmetic',
            'contact-email': 'E-mail: info@egyedu.com',
            'contact-phone': 'Contact: 002 0123456789',
            'contact-address': 'Address: Cairo, Egypt'
        }
    };
    
    const updateText = (lang) => {
        // Save language preference
        localStorage.setItem('preferred-language', lang);
        
        // Update all text elements
        Object.keys(translations[lang]).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(el => {
                el.textContent = translations[lang][key];
            });
            
            // Also update by class names
            const classElements = document.querySelectorAll(`.${key}`);
            classElements.forEach(el => {
                if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                    el.textContent = translations[lang][key];
                }
            });
        });
        
        // Update specific elements by class
        if (translations[lang]['nav-home']) {
            document.querySelectorAll('.nav-home').forEach(el => el.textContent = translations[lang]['nav-home']);
        }
        if (translations[lang]['nav-programs']) {
            document.querySelectorAll('.nav-programs').forEach(el => {
                const arrow = el.querySelector('.dropdown-arrow');
                if (arrow) {
                    el.innerHTML = translations[lang]['nav-programs'] + ' ' + arrow.outerHTML;
                } else {
                    el.textContent = translations[lang]['nav-programs'];
                }
            });
        }
        if (translations[lang]['hero-title']) {
            document.querySelectorAll('.hero-title').forEach(el => el.textContent = translations[lang]['hero-title']);
        }
        if (translations[lang]['hero-description']) {
            document.querySelectorAll('.hero-description').forEach(el => el.textContent = translations[lang]['hero-description']);
        }
        if (translations[lang]['section-title']) {
            document.querySelectorAll('.section-title').forEach(el => el.textContent = translations[lang]['section-title']);
        }
        if (translations[lang]['auth-login']) {
            document.querySelectorAll('.auth-login').forEach(el => el.textContent = translations[lang]['auth-login']);
        }
        if (translations[lang]['auth-subscribe']) {
            document.querySelectorAll('.auth-subscribe').forEach(el => el.textContent = translations[lang]['auth-subscribe']);
        }
        
        // Update card titles and texts
        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach((title, index) => {
            const card = title.closest('.course-card');
            if (card) {
                const cardLink = card.querySelector('[data-card-link]');
                if (cardLink) {
                    const cardType = cardLink.getAttribute('data-card-link');
                    const titleKey = `card-${cardType}-title`;
                    if (translations[lang][titleKey]) {
                        title.textContent = translations[lang][titleKey];
                    }
                    const textKey = `card-${cardType}-text`;
                    const cardText = card.querySelector('.card-text');
                    if (cardText && translations[lang][textKey]) {
                        cardText.textContent = translations[lang][textKey];
                    }
                }
            }
        });
        
        // Update dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-item-text');
        dropdownItems.forEach(item => {
            const strong = item.querySelector('strong');
            const span = item.querySelector('span');
            const link = item.closest('a');
            if (link) {
                if (link.href.includes('behavior.html')) {
                    if (strong && translations[lang]['dropdown-behavior-title']) strong.textContent = translations[lang]['dropdown-behavior-title'];
                    if (span && translations[lang]['dropdown-behavior-desc']) span.textContent = translations[lang]['dropdown-behavior-desc'];
                } else if (link.href.includes('cognitive.html')) {
                    if (strong && translations[lang]['dropdown-cognitive-title']) strong.textContent = translations[lang]['dropdown-cognitive-title'];
                    if (span && translations[lang]['dropdown-cognitive-desc']) span.textContent = translations[lang]['dropdown-cognitive-desc'];
                } else if (link.href.includes('language.html')) {
                    if (strong && translations[lang]['dropdown-language-title']) strong.textContent = translations[lang]['dropdown-language-title'];
                    if (span && translations[lang]['dropdown-language-desc']) span.textContent = translations[lang]['dropdown-language-desc'];
                } else if (link.href.includes('academic.html')) {
                    if (strong && translations[lang]['dropdown-academic-title']) strong.textContent = translations[lang]['dropdown-academic-title'];
                    if (span && translations[lang]['dropdown-academic-desc']) span.textContent = translations[lang]['dropdown-academic-desc'];
                }
            }
        });
        
        // Update card details
        document.querySelectorAll('.card-details span').forEach(span => {
            if (span.textContent.includes('عدد البرامج')) {
                span.innerHTML = `<i class="fas fa-graduation-cap"></i> ${translations[lang]['card-programs']} 6`;
            } else if (span.textContent.includes('عدد المستفيدين')) {
                const countEl = span.querySelector('.beneficiaries-count');
                if (countEl) {
                    span.innerHTML = `<i class="fas fa-users"></i> ${translations[lang]['card-beneficiaries']} <span class="beneficiaries-count" data-card="${countEl.getAttribute('data-card')}">${countEl.textContent}</span>`;
                }
            }
        });
        
        // Update "More" buttons
        document.querySelectorAll('.btn-card-more').forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                btn.innerHTML = `${translations[lang]['card-more']} ${icon.outerHTML}`;
            } else {
                btn.textContent = translations[lang]['card-more'];
            }
        });
        
        // Update navigation links
        if (translations[lang]['nav-guidance']) {
            document.querySelectorAll('.nav-guidance').forEach(el => el.textContent = translations[lang]['nav-guidance']);
        }
        if (translations[lang]['nav-support']) {
            document.querySelectorAll('.nav-support').forEach(el => el.textContent = translations[lang]['nav-support']);
        }
        if (translations[lang]['nav-about']) {
            document.querySelectorAll('.nav-about').forEach(el => el.textContent = translations[lang]['nav-about']);
        }
        if (translations[lang]['nav-subscriptions']) {
            document.querySelectorAll('.nav-subscriptions').forEach(el => el.textContent = translations[lang]['nav-subscriptions']);
        }
        if (translations[lang]['nav-contact']) {
            document.querySelectorAll('.nav-contact').forEach(el => el.textContent = translations[lang]['nav-contact']);
        }
        if (translations[lang]['nav-faq']) {
            document.querySelectorAll('.nav-faq').forEach(el => el.textContent = translations[lang]['nav-faq']);
        }
        
        // Update direction
        htmlElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');
        // Update language attribute
        htmlElement.lang = lang;
        
        // Update page title
        if (lang === 'en') {
            document.title = 'Egypt Education Platform | EDU Platform';
        } else {
            document.title = 'منصة مصر التعليمية | EDU Platform';
        }
    };
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'ar';
    if (savedLang === 'en') {
        updateText('en');
        if (langBtn) {
            langBtn.textContent = 'AR';
        }
    }


    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = htmlElement.lang || 'ar';
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            
            langBtn.textContent = newLang === 'ar' ? 'EN' : 'AR';
            langBtn.setAttribute('aria-label', `Toggle language to ${newLang === 'ar' ? 'Arabic' : 'English'}`);
            updateText(newLang);
        });
        
        // Set initial button text
        const currentLang = htmlElement.lang || 'ar';
        langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    }

    // ------------------------------------------
    // 2. Form Submission Handler (معالجة نموذج التسجيل)
    // ------------------------------------------
    const form = document.getElementById('registration-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            formMessage.textContent = '✅ تم التسجيل بنجاح! سيتم تحويلك لصفحة الدفع قريباً.';
            formMessage.style.color = 'green';
            form.reset(); 

            // في تطبيق حقيقي، يتم إرسال البيانات إلى الخادم والانتقال لصفحة الدفع.
            // مثال: setTimeout(() => { window.location.href = 'payment-gateway-url'; }, 2000);
        });
    }

    // ------------------------------------------
    // 3. Program Template Content Loader (تحميل محتوى صفحة البرنامج)
    // ------------------------------------------
    const programTitleEl = document.getElementById('program-main-title');
    const docTitleEl = document.getElementById('program-title');
    // (Keep the program loader logic from the previous response to dynamically update the title based on URL parameters)
    if (programTitleEl) {
        const urlParams = new URLSearchParams(window.location.search);
        const programParam = urlParams.get('program') || urlParams.get('course');
        
        let titleText = 'برنامجنا الخاص: ';

        if (programParam === 'heroes') { titleText = 'برامج أبطالنا'; } 
        else if (programParam === 'guidance') { titleText = 'خدمات الإرشاد الأسري'; } 
        else if (programParam === 'support') { titleText = 'خدمات الدعم'; }
        else if (programParam === 'behavior') { titleText = 'مجال السلوك والقيم'; } 
        // ... (Add more mappings)

        programTitleEl.textContent = titleText;
        docTitleEl.textContent = `${titleText} | منصة مصر التعليمية`;
    }

    // ------------------------------------------
    // 4. Scroll-based Animation Trigger (تأثير الحركة عند التمرير)
    // ------------------------------------------
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the animation by setting the final style properties
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Apply observation to all elements with the animation classes
    document.querySelectorAll('.slide-up, .scale-up').forEach(el => {
        // Initialize the start state
        if (el.classList.contains('slide-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('scale-up')) {
            el.style.transform = 'scale(0.9)';
        }
        el.style.opacity = 0;
        observer.observe(el);
    });
});

/* ========================================
   Payment JavaScript Code
   ضيف الكود ده في آخر ملف script.js بتاعك
======================================== */

// Payment Method Selection
const paymentMethods = document.querySelectorAll('.payment-method');
const paymentDetails = document.querySelectorAll('.payment-details');

paymentMethods.forEach(method => {
    method.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Remove active class from all methods
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all payment details
        paymentDetails.forEach(detail => detail.classList.remove('active'));
        
        // Show selected payment details
        const selectedMethod = radio.value;
        if (selectedMethod === 'vodafone') {
            document.getElementById('vodafone-details').classList.add('active');
        } else if (selectedMethod === 'instapay') {
            document.getElementById('instapay-details').classList.add('active');
        } else if (selectedMethod === 'credit-card') {
            document.getElementById('card-details').classList.add('active');
        }
    });
});

// Update payment summary when package is selected
const packageSelect = document.getElementById('subPackage');
const totalAmount = document.getElementById('total-amount');
const selectedPackageText = document.getElementById('selected-package');

if (packageSelect && totalAmount && selectedPackageText) {
    packageSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const packageValue = selectedOption.value;
        const packageText = selectedOption.text;
        
        // تحديد السعر حسب الباقة
        let price = 0;
        switch(packageValue) {
            case 'complete': price = 150; break;
            case 'special': price = 120; break;
            case 'free': price = 85; break;
            case 'behavior':
            case 'cognitive':
            case 'language':
            case 'academic': price = 50; break;
        }
        
        if (price > 0) {
            totalAmount.textContent = price + ' ج.م';
            selectedPackageText.textContent = packageText;
        } else {
            totalAmount.textContent = '0 ج.م';
            selectedPackageText.textContent = 'لم يتم اختيار باقة بعد';
        }
    });
}

// Card number formatting (يضيف مسافات تلقائياً)
const cardNumberInput = document.getElementById('card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Card expiry formatting (MM/YY)
const cardExpiryInput = document.getElementById('card-expiry');
if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

// Form submission with payment validation
const registrationForm = document.getElementById('registration-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.querySelector('.form-submit-btn');

if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate payment method
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPaymentMethod) {
            formMessage.textContent = '⚠️ يرجى اختيار طريقة الدفع';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }
        
        // Validate payment details based on selected method
        const paymentMethod = selectedPaymentMethod.value;
        let isValid = true;
        
        if (paymentMethod === 'vodafone') {
            const vodafoneNumber = document.getElementById('vodafone-number').value;
            const vodafonePin = document.getElementById('vodafone-pin').value;
            
            if (!vodafoneNumber || vodafoneNumber.length < 11) {
                formMessage.textContent = '⚠️ يرجى إدخال رقم فودافون كاش صحيح (11 رقم)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            } else if (!vodafonePin || vodafonePin.length !== 4) {
                formMessage.textContent = '⚠️ يرجى إدخال كود التأكيد (4 أرقام)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            }
        } else if (paymentMethod === 'instapay') {
            const instapayNumber = document.getElementById('instapay-number').value;
            const instapayPin = document.getElementById('instapay-pin').value;
            
            if (!instapayNumber || instapayNumber.length < 11) {
                formMessage.textContent = '⚠️ يرجى إدخال رقم انستا باي صحيح (11 رقم)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            } else if (!instapayPin || instapayPin.length !== 4) {
                formMessage.textContent = '⚠️ يرجى إدخال كود التأكيد (4 أرقام)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            }
        } else if (paymentMethod === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const cardName = document.getElementById('card-name').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            
            if (!cardNumber || cardNumber.length < 15) {
                formMessage.textContent = '⚠️ يرجى إدخال رقم البطاقة كاملاً';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            } else if (!cardName || cardName.trim() === '') {
                formMessage.textContent = '⚠️ يرجى إدخال اسم حامل البطاقة';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            } else if (!cardExpiry || cardExpiry.length !== 5) {
                formMessage.textContent = '⚠️ يرجى إدخال تاريخ انتهاء البطاقة (MM/YY)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            } else if (!cardCvv || cardCvv.length !== 3) {
                formMessage.textContent = '⚠️ يرجى إدخال رمز CVV (3 أرقام)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                isValid = false;
            }
        }
        
        if (!isValid) return;
        
        // Simulate payment processing
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري معالجة الدفع...';
        
        setTimeout(() => {
            formMessage.textContent = '✅ تم الدفع بنجاح! سيتم تفعيل اشتراكك خلال دقائق';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الاشتراك بنجاح';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                registrationForm.reset();
                paymentMethods.forEach(m => m.classList.remove('active'));
                paymentDetails.forEach(d => d.classList.remove('active'));
                if (totalAmount) totalAmount.textContent = '0 ج.م';
                if (selectedPackageText) selectedPackageText.textContent = 'لم يتم اختيار باقة بعد';
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'تأكيد التسجيل والانتقال للدفع';
                formMessage.style.display = 'none';
            }, 3000);
        }, 2000);
    });
}

/* ========================================
   Dropdown Menu JavaScript (اختياري)
   ده للموبايل فقط - ضيفه في آخر ملف script.js
   إذا كنت عايز القائمة تفتح بالضغط على الموبايل
======================================== */

// للموبايل: فتح القائمة المنسدلة بالضغط
document.addEventListener('DOMContentLoaded', function() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // على الموبايل فقط
            if (window.innerWidth <= 768) {
                e.preventDefault(); // منع الرابط من الفتح
                e.stopPropagation(); // منع إغلاق القائمة
                
                const parent = this.closest('.dropdown-menu-item');
                const isActive = parent.classList.contains('active');
                
                // إغلاق كل القوائم المفتوحة الأخرى
                document.querySelectorAll('.dropdown-menu-item').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // فتح/إغلاق القائمة الحالية
                if (isActive) {
                    parent.classList.remove('active');
                } else {
                    parent.classList.add('active');
                }
            }
        });
    });
    
    // إغلاق القائمة عند الضغط خارجها (لكن ليس على الروابط داخل القائمة)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const clickedItem = e.target.closest('.dropdown-menu-item');
            const clickedLink = e.target.closest('.dropdown-content a');
            
            // إذا تم الضغط على رابط داخل القائمة، اتركه يعمل
            if (clickedLink) {
                return;
            }
            
            // إذا تم الضغط خارج القائمة المنسدلة، أغلقها
            if (!clickedItem || !clickedItem.contains(e.target)) {
                document.querySelectorAll('.dropdown-menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
    });
});

/* ========================================
   Behavior Stories Pagination JavaScript
   ضيف الكود ده في آخر ملف script.js
======================================== */

// التنقل بين صفحات القصص
document.addEventListener('DOMContentLoaded', function() {
    const pageButtons = document.querySelectorAll('.page-btn');
    const storyPages = document.querySelectorAll('.stories-page-content');
    const currentPageNum = document.getElementById('current-page-num');
    const storiesRange = document.getElementById('stories-range');
    
    if (pageButtons.length > 0 && storyPages.length > 0) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pageNum = this.getAttribute('data-page');
                
                // إخفاء كل الصفحات
                storyPages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // إزالة النشط من كل الأزرار
                pageButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // تفعيل الصفحة المختارة
                const selectedPage = document.querySelector(`.stories-page-content[data-page="${pageNum}"]`);
                if (selectedPage) {
                    selectedPage.classList.add('active');
                }
                
                // تفعيل الزر المختار
                this.classList.add('active');
                
                // تحديث معلومات العداد
                if (currentPageNum) {
                    currentPageNum.textContent = pageNum;
                }
                
                if (storiesRange) {
                    const startStory = ((pageNum - 1) * 10) + 1;
                    const endStory = Math.min(pageNum * 10, 50);
                    storiesRange.textContent = `${startStory}-${endStory}`;
                }
                
                // التمرير لأعلى الصفحة
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // تفاعل أزرار المستويات في القصص
    const levelButtons = document.querySelectorAll('.story-item .level-btn');
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentLevels = this.closest('.levels-box');
            if (parentLevels) {
                // إزالة النشط من كل الأزرار في نفس المجموعة
                parentLevels.querySelectorAll('.level-btn').forEach(btn => {
                    btn.style.background = 'white';
                    btn.style.color = btn.classList.contains('level-1') ? '#4CAF50' :
                                      btn.classList.contains('level-2') ? '#FF9800' : '#f44336';
                });
                
                // تفعيل الزر المختار
                const levelColor = this.classList.contains('level-1') ? '#4CAF50' :
                                   this.classList.contains('level-2') ? '#FF9800' : '#f44336';
                this.style.background = levelColor;
                this.style.color = 'white';
            }
        });
    });
});

            // Search Icon Click - تفعيل البحث
            const searchIcon = document.querySelector('.search-icon');
            if (searchIcon) {
                searchIcon.addEventListener('click', () => {
                    // إنشاء نافذة البحث
                    const searchOverlay = document.createElement('div');
                    searchOverlay.className = 'search-overlay';
                    searchOverlay.innerHTML = `
                        <div class="search-modal">
                            <div class="search-header">
                                <h3 class="search-title">البحث</h3>
                                <button class="search-close" aria-label="إغلاق">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="search-body">
                                <input type="text" class="search-input" placeholder="ابحث عن..." autofocus>
                                <button class="search-submit">
                                    <i class="fas fa-search"></i> بحث
                                </button>
                            </div>
                            <div class="search-results"></div>
                        </div>
                    `;
                    document.body.appendChild(searchOverlay);
                    
                    // إغلاق النافذة
                    const closeBtn = searchOverlay.querySelector('.search-close');
                    const closeOverlay = () => {
                        searchOverlay.remove();
                    };
                    closeBtn.addEventListener('click', closeOverlay);
                    searchOverlay.addEventListener('click', (e) => {
                        if (e.target === searchOverlay) closeOverlay();
                    });
                    
                    // البحث
                    const searchInput = searchOverlay.querySelector('.search-input');
                    const searchSubmit = searchOverlay.querySelector('.search-submit');
                    const searchResults = searchOverlay.querySelector('.search-results');
                    
                    const performSearch = () => {
                        const query = searchInput.value.trim();
                        if (query.length < 2) {
                            searchResults.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">أدخل كلمة بحث (حرفين على الأقل)</p>';
                            return;
                        }
                        
                        // محاكاة نتائج البحث (يمكن استبدالها بـ API حقيقي)
                        const results = [
                            { title: 'مجال السلوك والقيم', link: 'behavior.html', desc: 'تنمية السلوك والذوق والقيم' },
                            { title: 'مجال المهارات المعرفية', link: 'cognitive.html', desc: 'التفكير والتحليل وحل المشكلات' },
                            { title: 'مجال اللغة والتخاطب', link: 'language.html', desc: 'النمو اللغوي والتعبير والاتصال' },
                            { title: 'مجال المهارات الأكاديمية', link: 'academic.html', desc: 'القراءة والكتابة والحساب' }
                        ].filter(item => 
                            item.title.includes(query) || item.desc.includes(query)
                        );
                        
                        if (results.length === 0) {
                            searchResults.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">لا توجد نتائج</p>';
                        } else {
                            searchResults.innerHTML = results.map(item => `
                                <a href="${item.link}" class="search-result-item">
                                    <h4>${item.title}</h4>
                                    <p>${item.desc}</p>
                                </a>
                            `).join('');
                        }
                    };
                    
                    searchSubmit.addEventListener('click', performSearch);
                    searchInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') performSearch();
                    });
                });
            }
document.addEventListener('DOMContentLoaded', () => {

    // 1. إعداد ثابت للتحكم في سرعة تأثير الحركة
    // قم بزيادة القيمة لـ 0.15 أو 0.20 لجعل الحركة أكثر وضوحاً
    const SOCIAL_PARALLAX_SPEED = 0.15; // تم تعديلها لتكون أوضح
    
    const socialIconsContainer = document.querySelector('.floating-social');

    if (socialIconsContainer) {
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // حساب الإزاحة الناتجة عن التمرير
            // نستخدم معامل موجب ليتحرك الـ div إلى الأسفل قليلاً عند التمرير لأسفل
            const parallaxOffset = scrollPosition * SOCIAL_PARALLAX_SPEED; 

            // نطبق الحركة المباشرة. هذا سيتجاوز خاصية top: 50%
            // وسيجعلها تتحرك ببطء مع السكرول.
            // **ملاحظة: تأكد من قراءة الخطوة الثانية بخصوص CSS**
            socialIconsContainer.style.transform = `translateY(${parallaxOffset}px)`;
        });
    }
});