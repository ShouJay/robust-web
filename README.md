# 羅伯斯特 Robust 官網

2026-10-20 依「交付成果／官網文字稿與製作註記.md」更新。保留石墨灰與琥珀色視覺，使用 HTML、CSS、JavaScript，無建置依賴。

## 頁面與內容

- `dist/index.html`：首頁、Street Eye 介紹、2026 桃園交通調查計畫、聯絡入口。
- `dist/journey.html`：公司介紹、核心團隊、服務能力、政府計畫、合作夥伴及 30 筆競賽成果。
- `dist/traffic.html`：交通轉向量與六項成果、MOT／Re-ID 技術、連續影格、服務流程、實績及常見問題。
- `dist/dark.css`：原有品牌版型。
- `dist/content.css`：本次內容頁與響應式版型。
- `dist/app.js`：手機選單、Escape 收合、頁尾年份。
- `dist/assets/brands/`：公司與合作夥伴 logo，供導覽、頁尾及合作夥伴品牌牆使用。
- `dist/assets/street-eye/`：15 張交付圖片，保留原始解析度與圖例，可從頁面開啟原圖；其中 6 張已有修訂稿的圖表與報表採用 `edt` 版本。

製作交接註記不作為公開文案。智慧居家與 AI 專案的基本底稿未製作公開頁面。過時的公開歷程下載文件已移除，舊版本仍保留於 Git 歷史。城市夜景為形象示意；實際分析圖均標示為示例。聯繫透過 mailto 與電話連結，沒有後端收件表單。

## 本機預覽

在 `site` 目錄執行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

開啟 http://127.0.0.1:4173 。

## GitHub Pages 部署

Git 儲存庫根目錄為 `site`，不是其上一層 `Robust-web`。部署工作流程位於 `.github/workflows/pages.yml`，推送 `main` 後會把 `dist` 發布至 GitHub Pages，也支援手動觸發。

首次部署需完成 GitHub 登入、建立或指定儲存庫、設定 Git remote，並在 GitHub 儲存庫 Settings → Pages → Build and deployment 選擇 GitHub Actions。工作流程依 [GitHub 官方說明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 設定。

目前僅完成本機網站與部署設定；尚未建立 GitHub 遠端、上傳或驗證公開網址。既有 `.openai/hosting.json` 保留原站識別，本次未對該託管服務發布。

## 驗證

- 三頁的本機連結、圖片檔案、頁內錨點及唯一 H1 檢查通過。
- JavaScript 語法與 Git diff 空白檢查通過。
- 瀏覽器檢查桌面首頁及 390px 手機版；三頁沒有橫向溢出。
- 手機選單連往交通頁與 FAQ 展開驗證通過。

## 舊版形象圖片紀錄

### 第二版首頁素材：dist/assets/city-night.jpg

由內建 ImageGen 生成，保留第一版圖片。提示詞：Use case: photorealistic-natural. Wide cinematic 16:9 architectural photograph for premium Taiwanese traffic technology company. Elevated view of a beautifully engineered curving urban road interchange at blue hour approaching night, road curves leading from lower left toward distant city skyline at right, very dark graphite sky and shadowed architectural mass, restrained warm amber streetlights and subtle long exposure vehicle light trails. Sophisticated authentic editorial photography, analog film texture, realistic roads, quiet composition, substantial negative dark space across upper left, muted charcoal slate palette and only warm golden light, no neon blue, no purple, no sci-fi, no holograms, no UI, no text, no logos. Photographic not illustration. Full bleed landscape.

## 圖像產生

使用內建 ImageGen 產生三張圖片，並複製到本專案中。下列為實際生成提示詞。

### connected-city.png

Use case: stylized-concept. Create a premium 3D clay illustration for Taiwanese AI company Robust X website hero. Wide landscape 3:2 image. A charming miniature connected city on a floating round lavender platform: curved two-lane road through center with tiny teal and purple cars, pastel cream apartment towers on left, a beautifully detailed cutaway smart house on right with warm living room and mint sofa, small puffy trees, a lilac camera sensor on pole overlooking road. Small floating purple connectivity rings. Soft-touch matte silicone and premium vinyl toy material, extremely rounded edges, physically rendered soft shadows, top left studio lighting, pale lavender #F4F1FA seamless background. Elegant playful architectural diorama, sophisticated and clean, substantial 3D depth. Tight balanced composition, no words, no letters, no numbers, no logos, no watermarks. Image will occupy right half of website hero.

### home.jpg

Use case: photorealistic-natural. Landscape 3:2 editorial architectural photograph for AI smart home website. Contemporary Taiwanese apartment, serene cream and warm oak living room, rounded pale mint sofa, large windows with soft afternoon light, leafy plant, elegant pendant light, small discreet smart home sensor and tablet on side table. No people, no text, no logos. Realistic premium residential photography, warm welcoming lived-in but tidy, tactile linen and wood textures, mild lavender accents. Wide composition.

### traffic.jpg

Use case: photorealistic-natural. Landscape 3:2 photograph for Taiwanese AI traffic analytics website: elevated oblique bird's-eye view over a modern Taiwanese city intersection, clear pedestrian crossings, cars buses and motor scooters traveling in orderly lanes, green roadside trees, bright soft daylight, realistic urban proportions, editorial architectural photography. Subtle cool lavender and teal color grade. No graphic overlays, no readable signage, no text, no watermarks. Road geometry must look plausible, clean crisp professional photograph.
