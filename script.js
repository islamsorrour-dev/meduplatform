document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------
    // 1. Language Toggle Functionality (التحكم باللغة)
    // ------------------------------------------

    const langBtn = document.getElementById('lang-btn');
    const htmlElement = document.documentElement;

    // (Add all translations here as needed for a fully translated site)
    const translations = {
        // ... (Keep the structure from the previous response but extend it) ...
        ar: {
            'nav-home': 'الرئيسية',
            'nav-programs': 'برامج ابطالنا',
            'nav-subscriptions': 'الإشتراكات',
            'hero-title': 'منصة مصر التعليمية',
            // ... (many more keys needed for full translation)
        },
        en: {
            'nav-home': 'Home',
            'nav-programs': 'Our Heroes Programs',
            'nav-subscriptions': 'Subscriptions',
            'hero-title': 'Egypt Education Platform',
             // ... (many more keys needed for full translation)
        }
    };
    
    const updateText = (lang) => {
        // This function needs to be fully implemented to switch all texts
        // Since the requirement is large, the structure is provided here.
        // It updates text based on classes and IDs.
        
        // Example implementation for few elements:
        document.querySelectorAll('.nav-home').forEach(el => el.textContent = translations[lang]['nav-home']);
        document.querySelectorAll('.hero-title').forEach(el => el.textContent = translations[lang]['hero-title']);
        // ... continue for all elements ...
        
        // Update direction
        htmlElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');
        // Update language attribute
        htmlElement.lang = lang;
    };


    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = htmlElement.lang === 'ar' ? 'ar' : 'en';
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            
            langBtn.textContent = newLang.toUpperCase();
            langBtn.setAttribute('aria-label', `Toggle language to ${newLang === 'ar' ? 'Arabic' : 'English'}`);
            updateText(newLang);
        });
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
        } else if (['visa', 'mastercard', 'mada'].includes(selectedMethod)) {
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
        } else {
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
                
                const parent = this.closest('.dropdown-menu-item');
                const isActive = parent.classList.contains('active');
                
                // إغلاق كل القوائم المفتوحة
                document.querySelectorAll('.dropdown-menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // فتح/إغلاق القائمة الحالية
                if (!isActive) {
                    parent.classList.add('active');
                }
            }
        });
    });
    
    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-menu-item')) {
            document.querySelectorAll('.dropdown-menu-item').forEach(item => {
                item.classList.remove('active');
            });
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

            // Search Icon Click
            const searchIcon = document.querySelector('.search-icon');
            if (searchIcon) {
                searchIcon.addEventListener('click', () => {
                    alert('وظيفة البحث ستكون متاحة قريباً!');
                    // يمكنك هنا إضافة نافذة بحث أو التوجيه لصفحة البحث
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