'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EditPropertyPage() {
  const t = useTranslations('form')
  const tStatus = useTranslations('status')
  const tTransaction = useTranslations('transactionType')
  const tType = useTranslations('propertyType')
  const router = useRouter()
  const params = useParams()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    descriptionRo: '',
    price: '',
    currency: 'EUR',
    area: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    buildingFloors: '',
    yearBuilt: '',
    city: '',
    street: '',
    streetNumber: '',
    building: '',
    apartment: '',
    brokerName: '',
    brokerEmail: '',
    brokerPhone: '',
    transactionType: 'SALE',
    propertyType: 'APARTMENT',
    status: 'DRAFT',
    images: [] as string[]
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/properties/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          descriptionRo: data.descriptionRo || '',
          price: data.price?.toString() || '',
          currency: data.currency || 'EUR',
          area: data.area?.toString() || '',
          rooms: data.rooms?.toString() || '',
          bedrooms: data.bedrooms?.toString() || '',
          bathrooms: data.bathrooms?.toString() || '',
          floor: data.floor?.toString() || '',
          buildingFloors: data.buildingFloors?.toString() || '',
          yearBuilt: data.yearBuilt?.toString() || '',
          city: data.city || '',
          street: data.street || '',
          streetNumber: data.streetNumber || '',
          building: data.building || '',
          apartment: data.apartment || '',
          brokerName: data.brokerName || '',
          brokerEmail: data.brokerEmail || '',
          brokerPhone: data.brokerPhone || '',
          transactionType: data.transactionType || 'SALE',
          propertyType: data.propertyType || 'APARTMENT',
          status: data.status || 'DRAFT',
          images: data.images || []
        })
        setLoading(false)
      })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(`/api/admin/properties/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        rooms: formData.rooms ? parseInt(formData.rooms) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        floor: formData.floor ? parseInt(formData.floor) : null,
        buildingFloors: formData.buildingFloors ? parseInt(formData.buildingFloors) : null,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : null
      })
    })

    if (response.ok) {
      router.push('/admin/listings')
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
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
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/admin/listings" className="text-gray-700 hover:text-gray-900">
                Listings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/admin/listings" className="text-blue-600 hover:text-blue-800">
            ← Back to Listings
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Property</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('title')} *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('status')}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DRAFT">{tStatus('draft')}</option>
                <option value="AVAILABLE">{tStatus('available')}</option>
                <option value="RESERVED">{tStatus('reserved')}</option>
                <option value="CLOSED">{tStatus('closed')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('transactionType')}
              </label>
              <select
                value={formData.transactionType}
                onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="RENT">{tTransaction('rent')}</option>
                <option value="SALE">{tTransaction('sale')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('propertyType')}
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="APARTMENT">{tType('apartment')}</option>
                <option value="HOUSE">{tType('house')}</option>
                <option value="LAND">{tType('land')}</option>
                <option value="COMMERCIAL">{tType('commercial')}</option>
                <option value="OFFICE">{tType('office')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('price')} *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('currency')}
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="EUR">EUR</option>
                <option value="RON">RON</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('area')} *
              </label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('rooms')}
              </label>
              <input
                type="number"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bedrooms')}
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bathrooms')}
              </label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('city')} *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('brokerName')} *
              </label>
              <input
                type="text"
                value={formData.brokerName}
                onChange={(e) => setFormData({ ...formData, brokerName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('brokerEmail')} *
              </label>
              <input
                type="email"
                value={formData.brokerEmail}
                onChange={(e) => setFormData({ ...formData, brokerEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('brokerPhone')} *
              </label>
              <input
                type="tel"
                value={formData.brokerPhone}
                onChange={(e) => setFormData({ ...formData, brokerPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('description')} *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('descriptionRo')}
            </label>
            <textarea
              value={formData.descriptionRo}
              onChange={(e) => setFormData({ ...formData, descriptionRo: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Update Property</Button>
            <Link href="/admin/listings">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
