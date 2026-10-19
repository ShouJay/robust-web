# Robust X 網站初版

本版以使用者提供的 High-Fidelity Claymorphism 設計系統製作，採無建置流程的 HTML、CSS、JavaScript。

## 預覽

在此目錄執行 `python3 -m http.server 4173 --directory dist`，瀏覽 http://localhost:4173。

## 編輯位置

- `dist/index.html`：首頁文案、兩大產品、互動示範、聯繫入口。
- `dist/journey.html`：歷程與團隊頁。
- `dist/styles.css`：集中定義色彩、陰影、字體、圓角與響應式樣式。
- `dist/app.js`：行動導覽、產品頁籤、時段示意及居家情境切換。
- `dist/history-source.md`：原始整理文件的可下載副本。
- `dist/assets/connected-city.png`：首頁主視覺。
- `dist/assets/traffic.jpg`：交通產品情境圖。
- `dist/assets/home.jpg`：居家產品情境圖。

將同名圖片替換即可更新畫面；替換時同步調整 HTML 的 alt 說明。人物目前以姓名縮寫作為頭像，可換成真實照片。

產品文案是設計提案，實際支援設備、功能與部署條件需後續確認。車流數字與居家模式為瀏覽器內示範；聯繫按鈕使用 mailto 開啟使用者的郵件軟體，沒有後端表單或裝置連線。

## 設計方向

主標：讓智慧，融入每一天。

交通產品：讀懂車流，看見城市的節奏。

居家產品：讓家的溫度，剛好是你喜歡的樣子。

繁體中文字體補入 Noto Sans TC，英文標題採 Nunito，內文採 DM Sans。Google Fonts 無法載入時回退系統 sans-serif。支援鍵盤頁籤、焦點樣式、減少動態效果設定與手機導覽。

## 圖像產生

使用內建 ImageGen 產生三張圖片，並複製到本專案中。下列為實際生成提示詞。

### connected-city.png

Use case: stylized-concept. Create a premium 3D clay illustration for Taiwanese AI company Robust X website hero. Wide landscape 3:2 image. A charming miniature connected city on a floating round lavender platform: curved two-lane road through center with tiny teal and purple cars, pastel cream apartment towers on left, a beautifully detailed cutaway smart house on right with warm living room and mint sofa, small puffy trees, a lilac camera sensor on pole overlooking road. Small floating purple connectivity rings. Soft-touch matte silicone and premium vinyl toy material, extremely rounded edges, physically rendered soft shadows, top left studio lighting, pale lavender #F4F1FA seamless background. Elegant playful architectural diorama, sophisticated and clean, substantial 3D depth. Tight balanced composition, no words, no letters, no numbers, no logos, no watermarks. Image will occupy right half of website hero.

### home.jpg

Use case: photorealistic-natural. Landscape 3:2 editorial architectural photograph for AI smart home website. Contemporary Taiwanese apartment, serene cream and warm oak living room, rounded pale mint sofa, large windows with soft afternoon light, leafy plant, elegant pendant light, small discreet smart home sensor and tablet on side table. No people, no text, no logos. Realistic premium residential photography, warm welcoming lived-in but tidy, tactile linen and wood textures, mild lavender accents. Wide composition.

### traffic.jpg

Use case: photorealistic-natural. Landscape 3:2 photograph for Taiwanese AI traffic analytics website: elevated oblique bird's-eye view over a modern Taiwanese city intersection, clear pedestrian crossings, cars buses and motor scooters traveling in orderly lanes, green roadside trees, bright soft daylight, realistic urban proportions, editorial architectural photography. Subtle cool lavender and teal color grade. No graphic overlays, no readable signage, no text, no watermarks. Road geometry must look plausible, clean crisp professional photograph.
