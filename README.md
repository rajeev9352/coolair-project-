# CoolAir - Modern Air Conditioning Solutions

A modern, responsive website for CoolAir, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Next.js 14 with App Router
- Tailwind CSS for styling
- React Hook Form with Zod validation
- Email integration with Resend
- Fully responsive design
- Dark/light mode support
- Form handling with validation
- TypeScript for type safety
- Testing setup with Jest and React Testing Library
- Environment variable validation with Zod

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/coolair-nextjs.git
   cd coolair-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update the environment variables with your configuration

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `type-check` - Run TypeScript type checker
- `test` - Run tests

## Project Structure

```
coolair-nextjs/
├── public/                 # Static files
├── src/
│   ├── app/                # App router
│   │   ├── api/            # API routes
│   │   └── ...
│   ├── components/         # Reusable components
│   ├── config/             # App configuration
│   ├── lib/                # Utility functions
│   ├── styles/             # Global styles
│   └── types/              # TypeScript type definitions
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

---

<p align="center">
  Made with ❤️ by Your Name
</p>
