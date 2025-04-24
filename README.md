# BLOOM Dental 3D

BLOOM (Building Learning Objects with Online Modeling) is a web application for dental educators to generate 3D models from 2D dental images. These models can be used for teaching on VR-Haptics Dental Simulators, VR Headsets, or in classroom settings.

## Features

- Upload dental images to generate 3D models
- Interactive 3D model viewer with rotation and zoom controls
- Download generated 3D models for use in VR simulators
- Research participation for dental educators
- Responsive design for desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **3D Rendering**: React Three Fiber, Three.js
- **Form Handling**: React Hook Form, Zod
- **State Management**: React Context API
- **Email Handling**: Nodemailer
- **Storage**: AWS S3
- **Testing**: Jest, React Testing Library, Cypress
- **CI/CD**: GitHub Actions, Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bloom-dental-3d.git
   cd bloom-dental-3d
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   SMTP_FROM=noreply@bloomdental3d.com
   MODEL_GENERATION_API_URL=https://api.example.com/generate-model
   MODEL_GENERATION_API_KEY=your-api-key
   STORAGE_BUCKET=bloom-dental-3d-models
   STORAGE_REGION=us-east-1
   STORAGE_ACCESS_KEY=your-access-key
   STORAGE_SECRET_KEY=your-secret-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm test
# or
yarn test
```

Run tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
# or
yarn test:coverage
```

### End-to-End Tests

Run end-to-end tests with Cypress:

```bash
npm run cypress:open
# or
yarn cypress:open
```

Run end-to-end tests in headless mode:

```bash
npm run cypress:run
# or
yarn cypress:run
```

Run end-to-end tests with the development server:

```bash
npm run e2e
# or
yarn e2e
```

## Deployment

### Vercel

The application is configured for deployment on Vercel. To deploy:

1. Push your changes to the main branch.
2. The GitHub Actions workflow will automatically deploy to Vercel.

### Manual Deployment

To manually deploy to Vercel:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   # or
   yarn global add vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

### Environment Variables

Set the following environment variables in your Vercel project:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `MODEL_GENERATION_API_URL`
- `MODEL_GENERATION_API_KEY`
- `STORAGE_BUCKET`
- `STORAGE_REGION`
- `STORAGE_ACCESS_KEY`
- `STORAGE_SECRET_KEY`

## Project Structure

```
bloom/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── api/         # API routes
│   │   ├── about/       # About page
│   │   └── participate/ # Participate page
│   ├── components/      # React components
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   ├── ui/          # UI components from shadcn/ui
│   │   ├── 3d-viewer/   # 3D viewer components
│   │   └── image-input/ # Image input components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── cypress/             # End-to-end tests
├── .github/             # GitHub Actions workflows
└── ...                  # Configuration files
```

## Research Team

- Dr. John Oyebisi - Principal Investigator
- Dr. Greg Slabaugh - Co-Investigator
- Dr. Chris Phillips - Co-Investigator

## License

This project is part of ongoing research at Queen Mary University of London.

## Contact

For more information, please contact Dr. John Oyebisi at j.a.oyebisi@qmul.ac.uk
