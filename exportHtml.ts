export const downloadStandaloneHtml = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Думите – мост между езиците | Самостоятелен урок VII клас (A1-A2)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: #030712;
      color: #f8fafc;
      overflow-x: hidden;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    h1, h2, h3, h4, .font-heading { font-family: 'Outfit', sans-serif; }
    header {
      background: rgba(15, 23, 42, 0.95);
      border-bottom: 1px solid rgba(51, 65, 85, 0.6);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(8px);
    }
    .brand-title {
      font-size: 1.15rem;
      font-weight: 800;
      background: linear-gradient(135deg, #38bdf8, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    .nav-actions { display: flex; gap: 8px; align-items: center; }
    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.2s ease;
      background: #1e293b;
      color: #f1f5f9;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn:hover { background: #334155; transform: translateY(-1px); }
    .btn-primary { background: linear-gradient(135deg, #0284c7, #6366f1); border-color: #38bdf8; }
    .btn-primary:hover { filter: brightness(1.15); }
    .btn-accent { background: linear-gradient(135deg, #7c3aed, #ec4899); border-color: #c084fc; }
    .btn-outline { background: transparent; border: 1px solid #475569; }
    .btn-outline:hover { background: rgba(255,255,255,0.05); }
    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
    }
    .slide-card {
      width: 100%;
      max-width: 1050px;
      min-height: 560px;
      background: #0f172a;
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 24px;
      padding: 36px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.08);
      position: relative;
      overflow: hidden;
      display: none;
      flex-direction: column;
      justify-content: space-between;
    }
    .slide-card.active { display: flex; animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .progress-bar-container {
      width: 100%;
      height: 4px;
      background: #1e293b;
      position: fixed;
      top: 57px;
      left: 0;
      z-index: 49;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #38bdf8, #818cf8, #a855f7);
      transition: width 0.3s ease;
      width: 4.5%;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      margin-bottom: 12px;
    }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .interactive-card {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 16px;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }
    .interactive-card:hover {
      border-color: #38bdf8;
      background: #253349;
      transform: translateY(-2px);
    }
    .footer-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 20px;
      backdrop-filter: blur(6px);
    }
    .modal-backdrop.show { display: flex; }
    .modal-card {
      background: #0f172a;
      border: 1px solid #38bdf8;
      border-radius: 20px;
      max-width: 800px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 32px;
    }
    @media (max-width: 768px) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="progress-bar-container">
    <div id="progressBar" class="progress-bar-fill"></div>
  </div>

  <header>
    <div style="display:flex; align-items:center; gap: 12px;">
      <span class="brand-title">🌉 ДУМИТЕ – МОСТ МЕЖДУ ЕЗИЦИТЕ</span>
      <span style="font-size: 0.85rem; color: #94a3b8; padding-left: 8px; border-left: 1px solid #334155;">VII клас · БЕЛ × English A1–A2</span>
    </div>
    <div class="nav-actions">
      <span id="slideIndicator" style="font-size: 0.9rem; font-weight: 700; color: #38bdf8; margin-right: 8px;">Слайд 1 / 23</span>
      <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
      <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      <button class="btn btn-accent" onclick="toggleTeacher()">ⓘ УЧИТЕЛ</button>
    </div>
  </header>

  <main id="slidesContainer">
    <!-- Slide 1: КОРИЦА -->
    <div id="slide-1" class="slide-card active">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <span class="badge" style="background:rgba(8, 145, 178, 0.2); border:1px solid #06b6d4; color:#38bdf8;">
            🏛️ Демонстрационен открит урок · VII клас
          </span>
          <span class="badge" style="background:rgba(124, 58, 237, 0.2); border:1px solid #a855f7; color:#d8b4fe;">
            БЕЛ × English A1–A2
          </span>
        </div>

        <h1 style="font-size:2.8rem; font-weight:800; background:linear-gradient(135deg, #38bdf8, #818cf8, #c084fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:10px; line-height:1.15;">
          „ДУМИТЕ – МОСТ МЕЖДУ ЕЗИЦИТЕ“
        </h1>
        <p style="color:#cbd5e1; font-size:1.05rem; margin-bottom:20px; line-height:1.5;">
          Интерактивна дигитална мисия за произхода, пътешествията и силата на думите
        </p>

        <!-- Visual Bridge -->
        <div style="background:#090d16; border:2px solid rgba(56, 189, 248, 0.35); border-radius:20px; padding:20px; margin-bottom:20px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap;">
            <div style="flex:1; min-width:180px; background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.35); padding:14px; border-radius:14px; text-align:center;">
              <span style="font-size:1.8rem;">🇧🇬</span>
              <h4 style="color:#34d399; font-size:1rem; margin-top:4px;">БЪЛГАРСКИ ЕЗИК</h4>
              <p style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Роден езиков дом · Домашни думи от общославянско наследство</p>
              <div style="font-size:0.75rem; color:#6ee7b7; font-family:monospace; margin-top:6px;">вода · земя · майка · ден</div>
            </div>
            
            <div style="flex:2; min-width:240px; text-align:center;">
              <span style="color:#38bdf8; font-weight:800; font-size:0.85rem; letter-spacing:1px;">🌉 ЕЗИКОВИЯТ МОСТ НА ДУМИТЕ 🌉</span>
              <p style="font-size:0.8rem; color:#cbd5e1; margin:8px 0;">Кликни за аудио и етимологичен път:</p>
              <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
                <button class="btn btn-outline" style="font-size:0.8rem; padding:6px 10px;" onclick="speakEnglish('coffee'); alert('☕ Кафе ⟷ Coffee: Арабски (qahwah) ➔ Османотурски (kahve) ➔ Български (кафе) и Английски (coffee)!')">☕ кафе ⟷ coffee</button>
                <button class="btn btn-outline" style="font-size:0.8rem; padding:6px 10px;" onclick="speakEnglish('football'); alert('⚽ Футбол ⟷ Football: Английски foot+ball ➔ международен спорт!')">⚽ футбол ⟷ football</button>
                <button class="btn btn-outline" style="font-size:0.8rem; padding:6px 10px;" onclick="speakEnglish('chocolate'); alert('🍫 Шоколад ⟷ Chocolate: Ацтекски xocolatl ➔ Испански ➔ Европа!')">🍫 шоколад ⟷ chocolate</button>
                <button class="btn btn-outline" style="font-size:0.8rem; padding:6px 10px;" onclick="speakEnglish('computer'); alert('💻 Компютър ⟷ Computer: Лат. computare ➔ английски ➔ български!')">💻 компютър ⟷ computer</button>
                <button class="btn btn-outline" style="font-size:0.8rem; padding:6px 10px;" onclick="speakEnglish('internet'); alert('🌐 Интернет ⟷ Internet: Международен термин (inter + net) за глобалната мрежа!')">🌐 интернет ⟷ internet</button>
              </div>
            </div>

            <div style="flex:1; min-width:180px; background:rgba(168, 85, 247, 0.1); border:1px solid rgba(168, 85, 247, 0.35); padding:14px; border-radius:14px; text-align:center;">
              <span style="font-size:1.8rem;">🇬🇧</span>
              <h4 style="color:#c084fc; font-size:1rem; margin-top:4px;">ENGLISH A1–A2</h4>
              <p style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Световен диалог · Лексика, слушане с разбиране и времена</p>
              <div style="font-size:0.75rem; color:#d8b4fe; font-family:monospace; margin-top:6px;">water · earth · mother · day</div>
            </div>
          </div>
        </div>

        <div style="background:#1e293b; border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border:1px solid #334155;">
          <div>
            <strong style="color:#fff; font-size:0.95rem;">Роля в мисията: Езикови детективи (Language Detectives) 🔎</strong>
            <p style="color:#94a3b8; font-size:0.85rem; margin-top:2px;">Всяко решено предизвикателство възстановява повреден сектор от моста!</p>
          </div>
          <button class="btn btn-accent" onclick="speakEnglish('Welcome, language detectives! Today words build bridges between Bulgarian and English!'); alert('Welcome, Language Detectives! Добре дошли в урока!')">🔊 Чуй поздрав</button>
        </div>
      </div>
      <div class="footer-nav">
        <span style="color:#64748b; font-size:0.85rem;">Клавиши: ← Предишен | Следващ →</span>
        <button class="btn btn-primary" style="font-size:1.05rem; padding:10px 24px; font-weight:800;" onclick="nextSlide()">🚀 СТАРТИРАЙ ЕЗИКОВАТА МИСИЯ →</button>
      </div>
    </div>

    <!-- Slide 1 -->
    <div id="slide-2" class="slide-card">
      <div>
        <span class="badge">Интегриран старт · Етимология</span>
        <h2 style="font-size:2.4rem; font-weight:800; color:#fff; margin-bottom:12px;">КАК ДУМИТЕ ПЪТУВАТ ПРЕЗ ВЕКОВЕТЕ</h2>
        <p style="color:#94a3b8; margin-bottom:16px;">Думите свързват култури и континенти. Кликни, за да разгледаш пътешествието им:</p>
        <div class="grid-3">
          <div class="interactive-card" onclick="alert('Футбол / football: Английски foot+ball ➔ цяла Европа ➔ България (края на 19. в.). Първо опитвали да я наричат ритнитоп!')">
            <strong style="color:#38bdf8; font-size:1.1rem;">⚽ Футбол ⟷ Football</strong><br>
            <small style="color:#cbd5e1;">Произход: Англия (19. век)</small>
          </div>
          <div class="interactive-card" onclick="alert('Кафе / coffee: Арабски qahwah ➔ османотурски kahve ➔ български и английски език!')">
            <strong style="color:#38bdf8; font-size:1.1rem;">☕ Кафе ⟷ Coffee</strong><br>
            <small style="color:#cbd5e1;">Произход: Етиопия / Арабски полуостров</small>
          </div>
          <div class="interactive-card" onclick="alert('Шоколад / chocolate: От ацтекски xocolatl ➔ испански ➔ френски ➔ български и английски!')">
            <strong style="color:#38bdf8; font-size:1.1rem;">🍫 Шоколад ⟷ Chocolate</strong><br>
            <small style="color:#cbd5e1;">Произход: Централна Америка (ацтеки)</small>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <span style="color:#64748b; font-size:0.85rem;">Клавиши: ← Предишен | Следващ →</span>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 2 -->
    <div id="slide-3" class="slide-card">
      <div>
        <span class="badge">Теория & Морфология</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ТРИТЕ СВЯТА НА ДУМИТЕ</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div class="interactive-card" onclick="alert('ДОМАШНИ ДУМИ: Общославянски и старобългарски думи от праславянски фонд (майка, земя, вода, ден, нощ, хляб).')">
            <h3 style="color:#34d399; font-size:1.2rem; margin-bottom:6px;">🏠 ДОМАШНИ ДУМИ</h3>
            <p style="font-size:0.85rem; color:#94a3b8;">Коренът на езика, съществуващи от векове.</p>
          </div>
          <div class="interactive-card" onclick="alert('ЗАЕМКИ: Усвоени думи, адаптирани морфологично в българския език (кафе, футбол, компютър, гара, балет).')">
            <h3 style="color:#38bdf8; font-size:1.2rem; margin-bottom:6px;">🌍 ЗАЕМКИ</h3>
            <p style="font-size:0.85rem; color:#94a3b8;">Членуват се, образуват мн. ч. и сродни думи.</p>
          </div>
          <div class="interactive-card" onclick="alert('ЧУЖДИЦИ: Думи с чужд облик с готови книжовни български синоними (лайк, фийдбек, локация, стори).')">
            <h3 style="color:#c084fc; font-size:1.2rem; margin-bottom:6px;">🔎 ЧУЖДИЦИ</h3>
            <p style="font-size:0.85rem; color:#94a3b8;">Гости в езика, които е добре да заменяме в официална реч.</p>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 3 -->
    <div id="slide-4" class="slide-card">
      <div>
        <span class="badge">Комбинирана задача · БЕЛ × English</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ЕЗИКОВИЯТ ДОМ И ИНДОЕВРОПЕЙСКИТЕ КОРЕНИ</h2>
        <p style="color:#94a3b8; margin-bottom:14px;">Българският и английският споделят древни индоевропейски корени! Кликни върху всяка родна дума:</p>
        <div class="grid-4">
          <div class="interactive-card" onclick="speakEnglish('water'); alert('вода ⟷ water (Индоевропейски корен *wod-)')">вода ➔ <strong>water</strong></div>
          <div class="interactive-card" onclick="speakEnglish('mother'); alert('майка ⟷ mother (Индоевропейски корен *méh₂tēr)')">майка ➔ <strong>mother</strong></div>
          <div class="interactive-card" onclick="speakEnglish('brother'); alert('брат ⟷ brother (Индоевропейски корен *bʰréh₂tēr)')">брат ➔ <strong>brother</strong></div>
          <div class="interactive-card" onclick="speakEnglish('night'); alert('нощ ⟷ night (Индоевропейски корен *nókʷts)')">нощ ➔ <strong>night</strong></div>
          <div class="interactive-card" onclick="speakEnglish('sun'); alert('слънце ⟷ sun / solar (Индоевропейски корен *sóh₂wl̥)')">слънце ➔ <strong>sun</strong></div>
          <div class="interactive-card" onclick="speakEnglish('eye'); alert('око ⟷ eye / ocular (Индоевропейски корен *h₃okʷ-)')">око ➔ <strong>eye</strong></div>
          <div class="interactive-card" onclick="speakEnglish('nose'); alert('нос ⟷ nose (Индоевропейски корен *néh₂s-)')">нос ➔ <strong>nose</strong></div>
          <div class="interactive-card" onclick="speakEnglish('day'); alert('ден ⟷ day (Индоевропейски корен *dʰegʷʰ-)')">ден ➔ <strong>day</strong></div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 4 -->
    <div id="slide-5" class="slide-card">
      <div>
        <span class="badge">Адаптация</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ЗАЕМКИТЕ И МЕЖДУНАРОДНИЯТ КУФАР</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div class="interactive-card" onclick="alert('Компютър: образува компютри, компютърът, компютърен!')">💻 компютър / computer</div>
          <div class="interactive-card" onclick="alert('Футбол: образува футболен, футболист, футболът!')">⚽ футбол / football</div>
          <div class="interactive-card" onclick="alert('Балет: образува балерина, балетен, балети!')">🩰 балет / ballet</div>
          <div class="interactive-card" onclick="alert('Ресторант: образува ресторантьор, ресторанти!')">🍽️ ресторант / restaurant</div>
          <div class="interactive-card" onclick="alert('Гара: образува гаров, гарата, гари!')">🚂 гара / station</div>
          <div class="interactive-card" onclick="alert('Кафе: образува кафето, кафета, кафяв!')">☕ кафе / coffee</div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 5 -->
    <div id="slide-6" class="slide-card">
      <div>
        <span class="badge">География</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">СВЕТОВНИТЕ МАРШРУТИ НА ДУМИТЕ</h2>
        <div style="background:#020617; padding:20px; border-radius:16px; border:1px solid #334155;">
          <button class="btn btn-outline" style="width:100%; margin-bottom:8px; text-align:left;" onclick="alert('Великобритания: football, sport, computer, internet, tennis')">🇬🇧 Лондон / Великобритания ➔ спорт & технологии</button>
          <button class="btn btn-outline" style="width:100%; margin-bottom:8px; text-align:left;" onclick="alert('Франция: gare, ballet, restaurant, trottoir, mode')">🇫🇷 Париж / Франция ➔ дипломация, градоустройство & изкуство</button>
          <button class="btn btn-outline" style="width:100%; margin-bottom:8px; text-align:left;" onclick="alert('Ориент: pazar, cesme, kahve, cay')">🇹🇷 Истанбул / Близък изток ➔ търговия & бит</button>
          <button class="btn btn-outline" style="width:100%; text-align:left;" onclick="alert('Америка: chocolate, tomato, potato')">🌎 Америка ➔ хранителни продукти след 1492 г.</button>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 6 -->
    <div id="slide-7" class="slide-card">
      <div>
        <span class="badge">Медийна култура</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ДЕТЕКТИВ В ЧАТА: ЧУЖДИЦИ VS. КНИЖОВЕН ЕЗИК</h2>
        <div style="background:#1e293b; padding:16px; border-radius:16px; margin-bottom:12px;">
          <p style="color:#cbd5e1; margin-bottom:8px;"><em>„Прати ми <span style="color:#c084fc;">локацията</span>! Качи едно <span style="color:#c084fc;">стори</span> и ми дай <span style="color:#c084fc;">фийдбек</span>!“</em></p>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; font-size:0.85rem;">
            <strong>Чуждица</strong><strong>English</strong><strong>Книжовен български</strong>
            <span>локация</span><span>location</span><span style="color:#34d399;">местоположение</span>
            <span>лайк</span><span>like</span><span style="color:#34d399;">харесване</span>
            <span>фийдбек</span><span>feedback</span><span style="color:#34d399;">обратна връзка</span>
            <span>стори</span><span>story</span><span style="color:#34d399;">история / видео</span>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 7 -->
    <div id="slide-8" class="slide-card">
      <div>
        <span class="badge" style="color:#fde047; border-color:#fde047;">Комбинирана · False Friends (A1-A2)</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">FALSE FRIENDS (ЛЪЖЛИВИ ПРИЯТЕЛИ)</h2>
        <div class="grid-2" style="margin-top:16px;">
          <div class="interactive-card" onclick="speakEnglish('fabric'); alert('fabric = ПЛАТ / ТЕКСТИЛ (а не фабрика! Фабрика е factory).')">
            <strong>fabric ➔ ПЛАТ / ТЕКСТИЛ</strong><br><small style="color:#f87171;">Не означава фабрика!</small>
          </div>
          <div class="interactive-card" onclick="speakEnglish('actual'); alert('actual = ДЕЙСТВИТЕЛЕН / СЪЩИНСКИ (а не актуален/модерен! Актуален е current/up-to-date).')">
            <strong>actual ➔ ДЕЙСТВИТЕЛЕН</strong><br><small style="color:#f87171;">Не означава актуален!</small>
          </div>
          <div class="interactive-card" onclick="speakEnglish('magazine'); alert('magazine = СПИСАНИЕ (а не търговски магазин! Магазин е shop/store).')">
            <strong>magazine ➔ СПИСАНИЕ</strong><br><small style="color:#f87171;">Не означава магазин!</small>
          </div>
          <div class="interactive-card" onclick="speakEnglish('family'); alert('family = СЕМЕЙСТВО (фамилно име е surname / last name).')">
            <strong>family ➔ СЕМЕЙСТВО</strong><br><small style="color:#f87171;">Не означава фамилно име!</small>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 8 -->
    <div id="slide-9" class="slide-card">
      <div>
        <span class="badge">Анализ в текста</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ЕЗИКОВ ДЕТЕКТИВ В ТЕКСТА</h2>
        <div style="background:#1e293b; padding:20px; border-radius:16px; font-size:1.2rem; line-height:2;">
          <span>Вчера си направих </span>
          <button class="btn btn-outline" onclick="alert('Следа открита! 🔎 Кафе е заемка!')">кафе</button>
          <span>, включих </span>
          <button class="btn btn-outline" onclick="alert('Следа открита! 🔎 Лаптоп е заемка!')">лаптопа</button>
          <span>, изпратих </span>
          <button class="btn btn-outline" onclick="alert('Следа открита! 🔎 Имейл е заемка!')">имейл</button>
          <span> и отидох да играя </span>
          <button class="btn btn-outline" onclick="alert('Следа открита! 🔎 Футбол е заемка!')">футбол</button>
          <span>.</span>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 9 -->
    <div id="slide-10" class="slide-card">
      <div>
        <span class="badge">Морфология</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">МОРФОЛОГИЧНА ЛАБОРАТОРИЯ (12 ДУМИ)</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div style="background:#064e3b; padding:16px; border-radius:14px;">
            <h3 style="color:#6ee7b7; margin-bottom:8px;">🏠 ДОМАШНИ</h3>
            <p>майка, хляб, земя, вода</p>
          </div>
          <div style="background:#0c4a6e; padding:16px; border-radius:14px;">
            <h3 style="color:#7dd3fc; margin-bottom:8px;">🌍 ЗАЕМКИ</h3>
            <p>кафе, футбол, компютър, балет</p>
          </div>
          <div style="background:#581c87; padding:16px; border-radius:14px;">
            <h3 style="color:#d8b4fe; margin-bottom:8px;">🔎 ЧУЖДИЦИ</h3>
            <p>лайк, фийдбек, стори, инфлуенсър</p>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 10 -->
    <div id="slide-11" class="slide-card">
      <div>
        <span class="badge" style="color:#f87171; border-color:#f87171;">Escape Room</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">РАЗКОДИРАЙ ЕЗИКОВИЯ МОСТ</h2>
        <p style="color:#cbd5e1; margin-bottom:16px;">Кодът за отключване на английския бряг (A1-A2) е: <strong>BRIDGE</strong></p>
        <div style="display:flex; gap:12px;">
          <input type="text" id="escapeCode" placeholder="КОД: BRIDGE" style="padding:10px 16px; border-radius:10px; background:#020617; border:1px solid #38bdf8; color:#fff; text-transform:uppercase;">
          <button class="btn btn-primary" onclick="if(document.getElementById('escapeCode').value.trim().toUpperCase()==='BRIDGE'){ alert('ВРАТАТА Е ОТКЛЮЧЕНА! 🎉 Добре дошли на English Bridge A1-A2!'); nextSlide(); } else { alert('Опитай код: BRIDGE'); }">Отключи</button>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 11 -->
    <div id="slide-12" class="slide-card">
      <div>
        <span class="badge">English A1-A2 Listening</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">THE STORY OF EMMA (LONDON)</h2>
        <div style="background:#1e293b; padding:24px; border-radius:20px; border:2px solid #38bdf8; margin-bottom:16px;">
          <p style="color:#e2e8f0; font-size:1.1rem; line-height:1.6; margin-bottom:16px;">
            “Hello everyone! My name is Emma and I am thirteen years old. I live in London with my family. Last summer, I visited Bulgaria with my school. I was amazed to see words like ресторант, компютър and футбол everywhere! English and Bulgarian share so many international words. Words truly build bridges between cultures!”
          </p>
          <button class="btn btn-primary" onclick="speakEnglish('Hello everyone! My name is Emma and I am thirteen years old. I live in London with my family. Last summer, I visited Bulgaria with my school. I was amazed to see words like ресторант, компютър and футбол everywhere! Words truly build bridges between cultures!')">🔊 ЧУЙ РАЗКАЗА НА АНГЛИЙСКИ</button>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 12 -->
    <div id="slide-13" class="slide-card">
      <div>
        <span class="badge">Detail Extraction A1-A2</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">LISTEN & COMPREHEND</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div class="interactive-card" onclick="alert('Вярно! Emma visited Bulgaria last summer.')">1. Where did Emma travel? ➔ <strong>To Bulgaria</strong></div>
          <div class="interactive-card" onclick="alert('Вярно! She was amazed to see familiar words like ресторант and футбол.')">2. What surprised her? ➔ <strong>Recognizable words</strong></div>
          <div class="interactive-card" onclick="alert('Вярно! visited и was са глаголи в Past Simple (минало свършено време).')">3. What tense is visited & was? ➔ <strong>Past Simple</strong></div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 13 -->
    <div id="slide-14" class="slide-card">
      <div>
        <span class="badge">Комуникация A1-A2</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">CHAT WITH EMMA (A1-A2)</h2>
        <div style="background:#1e293b; padding:20px; border-radius:16px;">
          <p style="color:#38bdf8; font-weight:bold;">Emma: “What did you do yesterday in your English class?”</p>
          <button class="btn btn-outline" style="margin:4px;" onclick="alert('Отлично! Past Simple с правилен глагол: Yesterday, we explored loanwords.')">“Yesterday, we explored loanwords.” (✓)</button>
          <button class="btn btn-outline" style="margin:4px;" onclick="alert('Грешка: с yesterday използваме минало време (explored), а не сегашно.')">“Yesterday, we explore loanwords.”</button>
          
          <p style="color:#38bdf8; font-weight:bold; margin-top:12px;">Emma: “Why do languages borrow words?”</p>
          <button class="btn btn-outline" style="margin:4px;" onclick="alert('Отличен A2 отговор със съюза because!')">“Because history, trade, and culture connect people.” (✓)</button>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 14 -->
    <div id="slide-15" class="slide-card">
      <div>
        <span class="badge">Лексика & Корени</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">WORD CONNECTIONS & INTERNATIONAL ROOTS</h2>
        <div class="grid-4" style="margin-top:16px;">
          <div class="interactive-card"><strong>tele- (far)</strong><br>telephone, television ➔ телефон, телевизия</div>
          <div class="interactive-card"><strong>auto- (self)</strong><br>automobile, autograph ➔ автомобил, автограф</div>
          <div class="interactive-card"><strong>bio- (life)</strong><br>biology, biography ➔ биология, биография</div>
          <div class="interactive-card"><strong>geo- (earth)</strong><br>geography, geometry ➔ география, геометрия</div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 15 -->
    <div id="slide-16" class="slide-card">
      <div>
        <span class="badge">Таймер 30 сек · Web Speech API</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">LISTEN & HUNT (30s CHALLENGE)</h2>
        <button class="btn btn-primary" style="margin-bottom:16px;" onclick="speakEnglish('In our modern world, we use technology every day. I study with my computer, listen to music on my phone, and search the internet for history projects.')">🔊 ЧУЙ РАЗКАЗА</button>
        <div class="grid-4">
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">💻</div>
            <strong>computer</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('computer')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">🎵</div>
            <strong>music</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('music')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">📱</div>
            <strong>phone</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('phone')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">🌐</div>
            <strong>internet</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('internet')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">🚆</div>
            <strong>train</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('train')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">✈️</div>
            <strong>airport</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('airport')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">🍕</div>
            <strong>pizza</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('pizza')">🔊 ЧУЙ</button>
          </div>
          <div class="interactive-card">
            <div style="font-size:1.5rem; margin-bottom:4px;">🏨</div>
            <strong>hotel</strong>
            <button class="btn btn-outline" style="margin-top:6px; font-size:0.75rem; padding:4px 8px; width:100%; justify-content:center;" onclick="speakEnglish('hotel')">🔊 ЧУЙ</button>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 16 -->
    <div id="slide-17" class="slide-card">
      <div>
        <span class="badge">Collocations A1-A2</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ENGLISH MEMORY: COLLOCATIONS</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div class="interactive-card" onclick="speakEnglish('surf the internet')">surf the internet ➔ сърфирам в интернет <button class="btn btn-outline" style="font-size:0.75rem; padding:2px 6px; margin-left:6px;">🔊 ЧУЙ</button></div>
          <div class="interactive-card" onclick="speakEnglish('play football')">play football ➔ играя футбол <button class="btn btn-outline" style="font-size:0.75rem; padding:2px 6px; margin-left:6px;">🔊 ЧУЙ</button></div>
          <div class="interactive-card" onclick="speakEnglish('listen to music')">listen to music ➔ слушам музика <button class="btn btn-outline" style="font-size:0.75rem; padding:2px 6px; margin-left:6px;">🔊 ЧУЙ</button></div>
          <div class="interactive-card" onclick="speakEnglish('read a book')">read a book ➔ чета книга <button class="btn btn-outline" style="font-size:0.75rem; padding:2px 6px; margin-left:6px;">🔊 ЧУЙ</button></div>
          <div class="interactive-card" onclick="speakEnglish('study at school')">study at school ➔ уча в училище <button class="btn btn-outline" style="font-size:0.75rem; padding:2px 6px; margin-left:6px;">🔊 ЧУЙ</button></div>
          <div class="interactive-card" onclick="speakEnglish('talk on the phone')">talk on the phone ➔ говоря по телефона <button class="btn btn-outline" style="font-size:0.75rem; padding:2px 6px; margin-left:6px;">🔊 ЧУЙ</button></div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 17 -->
    <div id="slide-18" class="slide-card">
      <div>
        <span class="badge">Граматика · Web Speech API</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">GRAMMAR BRIDGE: TENSES & QUESTIONS</h2>
        <div class="grid-2" style="margin-top:16px;">
          <div style="background:#1e293b; padding:20px; border-radius:16px;">
            <p style="margin-bottom:8px; font-weight:bold;">1. “Yesterday, Emma ______ a presentation.”</p>
            <button class="btn btn-outline" style="margin-bottom:8px; font-size:0.8rem;" onclick="speakEnglish('Yesterday, Emma prepared a presentation about loanwords.')">🔊 ЧУЙ ИЗРЕЧЕНИЕТО</button><br>
            <button class="btn btn-primary" style="margin:4px;" onclick="speakEnglish('prepared'); alert('Правилно! prepared (Past Simple с -ed).')">prepared (✓) 🔊</button>
            <button class="btn btn-outline" style="margin:4px;" onclick="speakEnglish('prepares')">prepares 🔊</button>
          </div>
          <div style="background:#1e293b; padding:20px; border-radius:16px;">
            <p style="margin-bottom:8px; font-weight:bold;">2. “Which question is correct in Past Simple?”</p>
            <button class="btn btn-outline" style="margin-bottom:8px; font-size:0.8rem;" onclick="speakEnglish('Did you learn new words yesterday?')">🔊 ЧУЙ ВЪПРОСА</button><br>
            <button class="btn btn-primary" style="margin:4px;" onclick="speakEnglish('Did you learn new words yesterday?'); alert('Правилно! Did you learn new words? (след did глаголът е в V1).')">Did you learn new words? (✓) 🔊</button>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 18 -->
    <div id="slide-19" class="slide-card">
      <div>
        <span class="badge">Фонетика & Web Speech API</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">TWO LANGUAGES, ONE BRIDGE: ФОНЕТИКА</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div class="interactive-card">
            компютър ➔ <strong>computer</strong> /kəmˈpjuːtər/<br>
            <button class="btn btn-primary" style="margin-top:8px; font-size:0.8rem; width:100%; justify-content:center;" onclick="speakEnglish('computer')">🔊 ЧУЙ: computer</button>
          </div>
          <div class="interactive-card">
            шоколад ➔ <strong>chocolate</strong> /ˈtʃɒklət/<br>
            <button class="btn btn-primary" style="margin-top:8px; font-size:0.8rem; width:100%; justify-content:center;" onclick="speakEnglish('chocolate')">🔊 ЧУЙ: chocolate</button>
          </div>
          <div class="interactive-card">
            музика ➔ <strong>music</strong> /ˈmjuːzɪk/<br>
            <button class="btn btn-primary" style="margin-top:8px; font-size:0.8rem; width:100%; justify-content:center;" onclick="speakEnglish('music')">🔊 ЧУЙ: music</button>
          </div>
          <div class="interactive-card">
            хотел ➔ <strong>hotel</strong> /hoʊˈtɛl/<br>
            <button class="btn btn-primary" style="margin-top:8px; font-size:0.8rem; width:100%; justify-content:center;" onclick="speakEnglish('hotel')">🔊 ЧУЙ: hotel</button>
          </div>
          <div class="interactive-card">
            телефон ➔ <strong>telephone</strong> /ˈtɛlɪfoʊn/<br>
            <button class="btn btn-primary" style="margin-top:8px; font-size:0.8rem; width:100%; justify-content:center;" onclick="speakEnglish('telephone')">🔊 ЧУЙ: telephone</button>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 19 -->
    <div id="slide-20" class="slide-card">
      <div>
        <span class="badge">Синтез · 4 зони</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ПОСТРОЙ МОСТА (СИНТЕЗ)</h2>
        <div class="grid-4" style="margin-top:16px;">
          <div style="background:#064e3b; padding:14px; border-radius:14px;"><strong>🏠 ДОМАШНА</strong><br>майка, вода, земя</div>
          <div style="background:#0c4a6e; padding:14px; border-radius:14px;"><strong>🌍 ЗАЕМКА</strong><br>кафе, футбол, компютър</div>
          <div style="background:#581c87; padding:14px; border-radius:14px;"><strong>🔎 ЧУЖДИЦА</strong><br>лайк, фийдбек, стори</div>
          <div style="background:#312e81; padding:14px; border-radius:14px;"><strong>🇬🇧 ENGLISH A1-A2</strong><br>visited, bridge, because</div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 20 -->
    <div id="slide-21" class="slide-card">
      <div>
        <span class="badge">Финален Quiz · БЕЛ × English A1-A2</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">ФИНАЛЕН ИНТЕГРИРАН QUIZ</h2>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div class="interactive-card" onclick="alert('Вярно! Заемката е напълно усвоена граматически и фонетично.')">1. Каква е разликата между заемка и чуждица? (Клик за отговор)</div>
          <div class="interactive-card" onclick="alert('Вярно! fabric означава плат, а не фабрика!')">2. Коя дума е false friend? ➔ fabric</div>
          <div class="interactive-card" onclick="alert('Вярно! Emma visited Bulgaria last summer and learned new words.')">3. Кое изречение е в Past Simple? ➔ Emma visited Bulgaria last summer.</div>
          <div class="interactive-card" onclick="alert('Вярно! вода и water споделят общ индоевропейски корен.')">4. Кои думи споделят индоевропейски корен? ➔ вода & water</div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 21 -->
    <div id="slide-22" class="slide-card">
      <div>
        <span class="badge">Рефлексия</span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:12px;">EXIT TICKET (БИЛЕТ ЗА ИЗХОД)</h2>
        <div class="grid-3" style="margin-top:16px;">
          <div class="interactive-card">💡 <strong>Днес разбрах, че...</strong><br><small style="color:#cbd5e1;">езиците споделят древни корени и думи пътешественици.</small></div>
          <div class="interactive-card">🔎 <strong>Важното правило...</strong><br><small style="color:#cbd5e1;">да разпознавам false friends и да пазя българския език.</small></div>
          <div class="interactive-card">🌉 <strong>Оттук нататък...</strong><br><small style="color:#cbd5e1;">ще изследвам произхода на думите с интерес.</small></div>
        </div>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="prevSlide()">← Назад</button>
        <button class="btn btn-primary" onclick="nextSlide()">Напред →</button>
      </div>
    </div>

    <!-- Slide 22 -->
    <div id="slide-23" class="slide-card">
      <div style="text-align:center; padding:20px;">
        <span class="badge" style="background:#065f46; color:#a7f3d0; border-color:#34d399;">🎉 MISSION COMPLETE!</span>
        <h2 style="font-size:2.8rem; font-weight:800; color:#fff; margin:16px 0;">ТЕ СТРОЯТ МОСТОВЕ.</h2>
        <p style="font-size:1.4rem; color:#38bdf8; font-weight:bold; margin-bottom:24px;">“Words build bridges.”</p>
        <div style="background:#1e293b; padding:24px; border-radius:20px; border:2px solid #eab308; max-width:600px; margin:0 auto 20px auto;">
          <h3 style="color:#fde047; font-size:1.4rem; margin-bottom:8px;">🏆 ДИГИТАЛЕН СЕРТИФИКАТ</h3>
          <p style="color:#fff; font-size:1.1rem; font-weight:bold;">Майстор на езиковия мост – VII клас</p>
          <p style="color:#94a3b8; font-size:0.85rem; margin-top:8px;">Български език (домашни, заемки, чуждици) × English A1–A2</p>
        </div>
        <button class="btn btn-primary" onclick="window.print()">🖨️ Принтирай сертификата</button>
      </div>
      <div class="footer-nav">
        <button class="btn btn-outline" onclick="goToSlide(1)">Върни се в началото</button>
      </div>
    </div>
  </main>

  <!-- Teacher Modal -->
  <div id="teacherModal" class="modal-backdrop">
    <div class="modal-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2 style="color:#38bdf8;">ⓘ Методически наръчник за открития урок</h2>
        <button class="btn btn-outline" onclick="toggleTeacher()">✕ Затвори</button>
      </div>
      <p style="color:#94a3b8; margin-bottom:16px;"><strong>Тема:</strong> Думите – мост между езиците (Български език & English A1–A2, VII клас)</p>
      <div style="margin-bottom:20px;">
        <h3 style="color:#f8fafc; font-size:1.1rem; margin-bottom:8px;">🎯 Образователни цели:</h3>
        <ul style="color:#cbd5e1; padding-left:20px; line-height:1.6;">
          <li>Разграничаване на домашни думи, заемки и чуждици.</li>
          <li>Осъзнаване на индоевропейското езиково родство (вода ⟷ water, майка ⟷ mother).</li>
          <li>Разпознаване на „лъжливи приятели“ (false friends: fabric, actual, magazine).</li>
          <li>Слушане и четене с разбиране на английски език (A1–A2: Past Simple, въпроси, because).</li>
          <li>Формиране на критическо мислене към ненужното замърсяване на езика с чуждици.</li>
        </ul>
      </div>
      <div>
        <h3 style="color:#f8fafc; font-size:1.1rem; margin-bottom:8px;">🧭 Методическа последователност:</h3>
        <p style="color:#cbd5e1; line-height:1.6;">Директно откриване → Осмисляне на корените → Междуезиков паралел → Морфологична практика → A1-A2 Комуникация → Рефлексия.</p>
      </div>
    </div>
  </div>

  <script>
    function speakEnglish(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
      } else {
        alert("Audio: " + text);
      }
    }

    let currentSlide = 1;
    const totalSlides = 23;

    function updateProgress() {
      document.getElementById('slideIndicator').innerText = 'Слайд ' + currentSlide + ' / ' + totalSlides;
      document.getElementById('progressBar').style.width = ((currentSlide / totalSlides) * 100) + '%';
      for (let i = 1; i <= totalSlides; i++) {
        const el = document.getElementById('slide-' + i);
        if (el) {
          if (i === currentSlide) el.classList.add('active');
          else el.classList.remove('active');
        }
      }
      window.scrollTo(0, 0);
    }

    function nextSlide() {
      if (currentSlide < totalSlides) {
        currentSlide++;
        updateProgress();
      }
    }

    function prevSlide() {
      if (currentSlide > 1) {
        currentSlide--;
        updateProgress();
      }
    }

    function goToSlide(n) {
      currentSlide = n;
      updateProgress();
    }

    function toggleTeacher() {
      const modal = document.getElementById('teacherModal');
      modal.classList.toggle('show');
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    window.addEventListener('DOMContentLoaded', () => {
      updateProgress();
    });
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dumite-most-urok-7klas.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
