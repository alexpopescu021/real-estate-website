import { prisma } from '@/lib/prisma'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default async function PropertyDetailPage({
  params
}: {
  params: { id: string }
}) {
  const t = useTranslations('property')
  const tStatus = useTranslations('status')
  const tTransaction = useTranslations('transactionType')
  const tType = useTranslations('propertyType')
  const tCurrency = useTranslations('currency')

  const property = await prisma.property.findUnique({
    where: { id: params.id }
  })

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Real Estate
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/listings" className="text-gray-700 hover:text-gray-900">
                Listings
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-gray-900">
                Search
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/listings" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to Listings
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {property.images.length > 0 && (
            <div className="h-96 bg-gray-200">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600">
                  {property.city}, {property.street} {property.streetNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-blue-600">
                  {property.price.toLocaleString()} {tCurrency[property.currency as keyof typeof tCurrency]}
                </p>
                <p className="text-gray-600 mt-1">
                  {property.transactionType === 'RENT' ? tTransaction('rent') : tTransaction('sale')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">{t('area')}</p>
                <p className="text-2xl font-semibold">{property.area} m²</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">{t('rooms')}</p>
                <p className="text-2xl font-semibold">{property.rooms}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">{t('bedrooms')}</p>
                <p className="text-2xl font-semibold">{property.bedrooms}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">{t('bathrooms')}</p>
                <p className="text-2xl font-semibold">{property.bathrooms}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('description')}</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('contact')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg font-semibold mb-2">{property.brokerName}</p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {property.brokerEmail}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {property.brokerPhone}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={`mailto:${property.brokerEmail}`}>
                <Button size="lg">{t('contactBroker')}</Button>
              </a>
              <a href={`tel:${property.brokerPhone}`}>
                <Button size="lg" variant="outline">
                  Call Broker
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
