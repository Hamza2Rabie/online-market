const spinner = document.getElementById('loadingSpinner');
const container = document.getElementById('products');

fetch('products.xml')
  .then(res => res.text())
  .then(xmlText => {
    spinner.style.display = 'none';
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'application/xml');
    const products = xml.getElementsByTagName('product');

    for (let product of products) {
      const name = product.getElementsByTagName('name')[0].textContent;
      const price = product.getElementsByTagName('price')[0].textContent;
      const image = product.getElementsByTagName('image')[0].textContent;
      const desc = product.getElementsByTagName('description')[0].textContent;

      const card = document.createElement('div');
      card.className = 'card';
      card.tabIndex = 0;
      card.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="card-body">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price">$${price}</div>
        </div>
      `;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotateX = ((y - midY) / midY) * 8;
        const rotateY = ((x - midX) / midX) * 8;
        card.style.transform = `translateY(-10px) scale(1.05) rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg)`;
        card.style.boxShadow = `0 20px 30px rgba(78, 84, 200, 0.3),
          ${rotateY * 2}px ${-rotateX * 2}px 20px rgba(0,0,0,0.15)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      card.addEventListener('click', () => {
        document.getElementById('productModalLabel').textContent = name;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalImage').alt = name;
        document.getElementById('modalDescription').textContent = desc;
        document.getElementById('modalPrice').textContent = '$' + price;
        const productModal = new bootstrap.Modal(document.getElementById('productModal'));
        productModal.show();
      });

      container.appendChild(card);
    }
  })
  .catch(err => {
    spinner.style.display = 'none';
    container.innerHTML = '<p class="text-danger text-center">Failed to load products.</p>';
    console.error('Error loading XML:', err);
  });

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const errorDiv = document.getElementById('loginError');

  if(email === 'user@example.com' && password === '123456') {
    errorDiv.classList.add('d-none');
    const loginModalEl = document.getElementById('loginModal');
    const loginModal = bootstrap.Modal.getInstance(loginModalEl);
    loginModal.hide();
    alert('Login successful! Welcome, ' + email);
  } else {
    errorDiv.classList.remove('d-none');
  }
});
  const btn = document.getElementById("backToTopBtn");
  let scrollTimeout;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('Back to Top button clicked');
  }

  function showButton() {
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
    btn.style.transform = "translateY(0)";
  }

  function hideButton() {
    btn.style.opacity = "0";
    btn.style.pointerEvents = "none";
    btn.style.transform = "translateY(20px)";
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        showButton();
      }, 300);
    } else {
      clearTimeout(scrollTimeout);
      hideButton();
    }
  });

  btn.addEventListener("focus", showButton);
  btn.addEventListener("blur", () => {
    if (window.scrollY <= 40) {
      hideButton();
    }
  });

  function updateBtnSize() {
    if (window.innerWidth < 576) { 
      btn.style.width = "40px";
      btn.style.height = "40px";
    } else {
      btn.style.width = "50px";
      btn.style.height = "50px";
    }
  }

  window.addEventListener("resize", updateBtnSize);
  updateBtnSize();

  hideButton();
  /*
هذا الكود يقوم بتحميل بيانات المنتجات من ملف XML ثم يعرضها كبطاقات على الصفحة مع تأثيرات تفاعلية:
1. يبدأ بتحديد عناصر مؤشر التحميل (spinner) وحاوية المنتجات (container).
2. يستخدم fetch لجلب ملف 'products.xml'، ثم يحول الرد إلى نص XML.
3. بعد تحميل البيانات، يخفي مؤشر التحميل.
4. يستخدم DOMParser لتحويل نص الـ XML إلى مستند قابل للقراءة.
5. يحصل على جميع عناصر <product> من المستند.
6. لكل منتج، يقرأ الاسم، السعر، الصورة، والوصف.
7. ينشئ عنصر 'div' جديد بفئة 'card' لكل منتج ويملأه بمحتوى HTML يعرض بيانات المنتج.
8. يضيف حدث 'mousemove' على البطاقة ليحسب موقع الماوس ويطبق تأثير دوران ثلاثي الأبعاد حسب حركة الماوس داخل البطاقة.
9. يضيف حدث 'mouseleave' لإرجاع البطاقة لحالتها الأصلية عندما يغادر الماوس.
10. يضيف حدث 'click' لعرض نافذة منبثقة (modal) بها تفاصيل المنتج عند الضغط على البطاقة.
11. يضيف البطاقة إلى الحاوية الرئيسية.
12. في حال فشل تحميل XML، يخفي مؤشر التحميل ويعرض رسالة خطأ.
13. يضيف معالجة للنموذج الخاص بتسجيل الدخول: 
    - يمنع إعادة تحميل الصفحة عند الإرسال.
    - يتحقق من صحة البريد وكلمة السر (مقارنة بنموذج ثابت).
    - إذا صح، يخفي النافذة ويظهر رسالة ترحيب.
    - إذا خطأ، يعرض رسالة خطأ.
14. يتعامل مع زر "العودة للأعلى" (Back to Top):
    - يعرض الزر فقط عند التمرير لأسفل أكثر من 300 بكسل مع تأخير بسيط.
    - يخفي الزر عند التمرير للأعلى.
    - يجعل الزر متوافق مع التركيز (عند التنقل بلوحة المفاتيح).
    - يغير حجم الزر حسب حجم الشاشة للاستجابة.
    - عند الضغط على الزر يتم التمرير بسلاسة إلى أعلى الصفحة.
*/
