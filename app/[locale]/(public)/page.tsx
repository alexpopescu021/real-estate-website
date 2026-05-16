import { useTranslations } from 'next-intl'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const t = useTranslations('nav')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Real Estate</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/listings" className="text-gray-700 hover:text-gray-900">
                {t('listings')}
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-gray-900">
                {t('search')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Property
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Browse our extensive collection of properties for rent and sale
          </p>
          <Link
            href="/listings"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View All Listings
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">For Rent</h3>
            <p className="text-gray-600">Find the perfect rental property for your needs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">For Sale</h3>
            <p className="text-gray-600">Discover properties available for purchase</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Expert Agents</h3>
            <p className="text-gray-600">Work with experienced real estate professionals</p>
          </div>
        </div>
      </main>
    </div>
  )
}
