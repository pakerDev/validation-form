# Validation Form

## Tech Stack Requirement: 
- React 18
- Typescript

## Request:
### Step 1.
1. 建立 React 專案
2. 建立一個表單（如附圖）
3. 表單輸入框動態新增要求如下：   
   3.1 Title input limit: `1`, default: `1`   
   3.2 Sub Title input limit: `3`, default: `1`   
   3.3 Description input limit: `5`, default `1`   
4. 當輸入框達到新增上限時必須將 Add button 轉為 `disabled`，功能與樣式都需達到演示 disabled 需求
5. 表單渲染的 inputs 必須包裝在一個 `Data Schema` 內   
   ```js
   // Object
    { title, subTtitle, description }
   ```
7. 使用組件與資料進行整個表單渲染

![Screenshot 2024-01-16 at 17 34 10](https://github.com/pakerDev/validation-form/assets/136687205/bddc0ec3-d790-47c3-9a38-889c3bce5e3d)

### Step 2.
1. 表單字數限制
  - Title: 15 個字
  - SubTitle: 30 個字
  - Description: 60 個字
2. 表單驗證
  - 中、英、數 字數驗證
  - 排除特殊字元
3. 增加 Input Field 刪除功能
4. 新增 Submit 並在表單右側顯示資料內容

Note. 請不依賴相關套件下手刻實作
  - 驗證核心
  - 表單控制

### Setup 3.
1. 修復 Bug Tickets
2. 完成表定 [Issues](https://github.com/pakerDev/validation-form/issues)


---

## Work flow
- 請在 [Issue](https://github.com/pakerDev/validation-form/issues) 自行建立工單 eg. Jira
- 以 gitflow 進行開發
- Commit Pattern 遵循 game client commit 規範，並在 commit message 開頭加上 issue 單號    
  ex: Issue 單號為 1 Commit: `feat: #1 add ...etc`
- PR 必須 tag `Reviewer`, `Assignees`   
  Ex:   
![Screenshot 2024-01-16 at 17 33 59](https://github.com/pakerDev/validation-form/assets/136687205/2118725c-24c4-44b0-bdb0-76c6b93f8c0e)

## Note: 
- 除 React 18, Typescript 外，樣式套件自由選擇，但不允許額外安裝表單相關套件
- 表單及相關交互邏輯請透過手刻
