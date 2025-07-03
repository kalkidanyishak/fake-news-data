// Assuming you're using Next.js Pages Router (e.g., pages/index.js)
// If using App Router (app/page.tsx), adjust imports and component definition slightly.

import Link from "next/link";
import Head from "next/head"; // For setting page title
import { Home, PencilRuler, Megaphone, UserPen, Section } from "lucide-react"; // Example icons
import MinimalAmharicMarkdownViewer from "./(main)/_components/markdown-renderer";
import { AmharicNlpInsightsAm } from "./(main)/_components/insight";

// You might want to define your site name
const SITE_NAME = "InsightLens"; // Or whatever your fake news analysis site is called

const cardData = [
  {
    href: "/insights",
    icon: <Home size={36} className="mb-3 text-blue-600" />,
    title: "Home",
    description:
      "የእርስዎ ግብዓት የአማርኛ NLP ሞዴል ስልጠናን እንዴት እንደሚደግፍ ስለ የውሂብ ስብስብ አስተዋጾ፣ የማብራሪያ ስታቲስቲክስ እና ግንዛቤዎችን ያግኙ።",
    originalPathNameCheck: "/",
  },
  {
    href: "/admin",
    icon: <PencilRuler size={36} className="mb-3 text-purple-600" />,
    title: "Review Panel",
    description:
      "ለታመኑ ገምጋሚዎች እና የቋንቋ ሊቃውንት የተነደፈ። የይገባኛል ጥያቄዎችን እና መጣጥፎችን ለመሰየም እና ለማብራራት ያግዙ፡-",
    originalPathNameCheck: "/admin",
  },
  {
    href: "/claims",
    icon: <Megaphone size={36} className="mb-3 text-green-600" />,
    title: "Explore Claims",
    description:
      "ሊፈለግ የሚችል፣ ሊጣራ የሚችል ያለፉ ግቤቶች ዝርዝር - ለ AI የውሂብ ስብስብ ግንበኞች፣ ጋዜጠኞች እና ተመራማሪዎች ይገኛል።",
    originalPathNameCheck: "/claims",
  },
  {
    href: "/claims/my-claims",
    icon: <UserPen size={36} className="mb-3 text-yellow-600" />,
    title: "My Submissions",
    description: "ለመተንተን ያቀረቧቸውን የዜና ዘገባዎች ሁኔታ ይከታተሉ እና ታሪክዎን ይመልከቱ።",
    originalPathNameCheck: "/claims/my-claims",
  },
];

export default function HomePage() {
  // In a real app, you'd get pathname from `useRouter`
  // For this static example, we'll assume we are on "/"
  const pathname = "/"; // Example: const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{SITE_NAME} - News Analysis Platform</title>
        <meta
          name="description"
          content={`Welcome to ${SITE_NAME}. Dive deep into news analysis, understand biases, and verify information.`}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 flex flex-col items-center justify-center p-4 sm:p-8">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            ወደ <span className="text-blue-600">{SITE_NAME}</span> እንኳን ደህና መጡ
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            ለወደፊቱ የ AI ሞዴሎችን በማሰልጠን የተሳሳቱ መረጃዎችን ለመለየት እና ተጨባጭ ዘገባዎችን ለማቅረብ
            የአማርኛ ቋንቋ መረጃ ስብስብ እየገነባን ነው።
          </p>
        </header>

        <main className="w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`
                  p-6 flex flex-col items-center justify-start text-center 
                  bg-white rounded-xl shadow-lg hover:shadow-2xl 
                  transition-all duration-300 ease-in-out transform hover:-translate-y-1
                  border-2 border-transparent 
                  ${
                    pathname === card.originalPathNameCheck // This logic might be slightly different in a real app
                      ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2" // Active state for card
                      : "hover:border-blue-300"
                  }
                `}
              >
                {card.icon}
                <h2 className="text-xl font-semibold text-slate-700 mb-2">
                  {card.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>Dedicated to promoting media literacy and critical thinking.</p>
        </footer>
      </div>
    </>
  );
}
