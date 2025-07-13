# nbo-issuer-node-ui

NBO issuer node UI

## Getting Started

1. **Clone the repository:**

```bash
git clone git@github.com:gft-blx/nbo-issuer-node-ui.git
```

2. **Navigate to the project directory**

```bash
cd nbo-issuer-node-ui
```

3. **Install dependencies**

```bash
npm install
```

4. **Start the development server**

```bash
npm run dev
```

Open your browser and visit http://localhost:5174 to view the app.

## Build for production

```bash
npm run build
```

Look for `/dist` folder for the output

## Email Template development

### Start email template dev server

```
npm run email:dev
```

Visit http://localhost:3000 and edit any files in the `/emails` folder to see the change

**NOTE**

- All email templates and their reusable components are isolated in the `/emails` folder
- Each `<file>.tsx` in `/emails` corresponds to an email template
- To get the HTML output, go to http://localhost:3000, select the email, chose Source tab, then open the HTML tab and copy the content.
