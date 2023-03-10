import { provider } from '$lib/config'
import type { Error } from '$lib/types'
import { getAPI, post } from '$lib/utils/api'
import {
	postBigCommerceApi,
	postWooCommerceApi,
	getBigCommerceApi,
	getBySid,
	getWooCommerceApi,
	postBySid
} from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchWishlist = async ({
	origin,
	storeId,
	search,
	sort,
	currentPage,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await getBySid(
						`wishlists/my?search=${search || ''}&sort=${sort}&page=${currentPage}&store=${storeId}`,
						sid
					)
				} else {
					res = await getAPI(
						`wishlists/my?search=${search || ''}&sort=${sort}&page=${currentPage}&store=${storeId}`,
						origin
					)
				}
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`wishlists/my`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`wishlists/my`, {}, sid)
				break
		}
		return res?.data || []
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data.message)
	}
}

export const checkhWishlist = async ({
	origin,
	storeId,
	pid,
	vid,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await getBySid(
						`wishlists/check?product=${pid}&variant=${vid}&store=${storeId}`,
						sid
					)
				} else {
					res = await getAPI(
						`wishlists/check?product=${pid}&variant=${vid}&store=${storeId}`,
						origin
					)
				}
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`wishlists/check`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`wishlists/check`, {}, sid)
				break
		}
		return res
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data.message)
	}
}

export const toggleWishlistService = async ({
	storeId,
	pid,
	vid,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await postBySid(`wishlists/toggle`, { pid, vid, store: storeId }, sid)
				} else {
					res = await post(`wishlists/toggle`, { pid, vid, store: storeId }, origin)
				}
				break
			case 'bigcommerce':
				res = await postBigCommerceApi(`wishlists/toggle`, {})
				break
			case 'woocommerce':
				res = await postWooCommerceApi(`wishlists/toggle`, {})
				break
		}
		return res
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data.message)
	}
}
