# Studio Master

A modern web application for tracking meals and fitness activities with AI-powered analysis.

## Features

- 🍽️ Meal tracking with AI-powered food recognition
- 📊 Nutritional analysis and breakdown
- 👟 Step counting and activity tracking
- 💧 Water intake monitoring
- 🎯 Goal setting and progress tracking
- 📱 PWA support for mobile devices

## Tech Stack

- Next.js 15.2.3
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- GenKit AI for food recognition
- Local Storage for data persistence

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/studio-master.git
cd studio-master
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and sign up/login with your GitHub account
3. Click "New Project" and import your repository
4. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

The application will be automatically deployed and you'll receive a production URL.

### Environment Variables

Make sure to set these environment variables in your Vercel project settings:

```
NEXT_PUBLIC_GENKIT_API_KEY=your_genkit_api_key
```

### Manual Deployment

To deploy to your own server:

1. Build the application
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

The application will be available on port 3000 by default.

## Project Structure

```
src/
├── ai/          # AI-related code and flows
├── app/         # Next.js app router pages
├── components/  # Reusable React components
├── hooks/       # Custom React hooks
├── lib/         # Utility functions
└── services/    # Business logic and data services
```

## PWA Support

The application is PWA-enabled, allowing users to install it on their devices for an app-like experience. Features include:
- Offline support
- Add to home screen
- Fast loading times
- Native-like experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
