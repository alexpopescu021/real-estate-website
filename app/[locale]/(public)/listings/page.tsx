import { prisma } from '@/lib/prisma'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default async function ListingsPage() {
  const t = useTranslations('property')
  const tStatus = useTranslations('status')
  const tTransaction = useTranslations('transactionType')
  const tType = useTranslations('propertyType')
  const tCurrency = useTranslations('currency')

  const properties = await prisma.property.findMany({
    where: {
      status: 'AVAILABLE'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          All Listings
        </h1>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {property.images.length > 0 && (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {property.title}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {property.price.toLocaleString()} {tCurrency[property.currency as keyof typeof tCurrency]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {property.city}, {property.street}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{property.area} m²</span>
                    <span>{property.rooms} {t('rooms')}</span>
                    <span>{property.bedrooms} {t('bedrooms')}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {property.transactionType === 'RENT' ? tTransaction('rent') : tTransaction('sale')}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {tType(property.propertyType.toLowerCase() as any)}
                    </span>
                  </div>
                  <Link href={`/listings/${property.id}`}>
                    <Button className="w-full">{t('viewDetails')}</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
