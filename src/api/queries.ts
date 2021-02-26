import {gql} from '@apollo/client'

export const GET_SHOP_ID = gql`{ 
    primaryShopId 
}`

export const GET_LIVE_SALES_EVENTS = gql`
    query LiveSalesEvents($shopId: ID!) {
        liveSalesEvents(shopId: $shopId) {
            nodes {
                _id
                title
                streamTarget
                startDate
                claimWord
                includedUrl
            }
        }
    }`


export const GET_LIVE_STREAM_SERVERS = gql`
	query listIngestServers($input: ID!) {
		listIngestServers(shopId: $shopId) {
			nodes{
				name
		    shopId
		    status
		    dns
		    ip
		    _id
		    eventId
		    tags
		    inputUrl
		    outputUrl
      }
    }
  }`

export const GET_INGEST_SERVER_DETAILS = gql`
	query getIngestServerDetails($shopId: ID!, $eventId: ID!) {
		getIngestServerDetails(shopId: $shopId, eventId: $eventId) {
			name
      shopId
      status
      dns
      ip
      inputUrl
      outputUrl
    }
  }`

export const GET_SHOPS = gql`{
    shops {
      nodes {
        name
        _id
        shopLogoUrls {
          primaryShopLogoUrl
        }
      }
    }
}`

