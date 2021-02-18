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
	mutation listIngestServers($input: ID!) {
		listIngestServers(shopId: $shopId) {
			nodes{
				name
        shopId
        status
        dns
        ip
        _id
      }
    }
  }`

export const GET_INGEST_SERVER_DETAILS = gql`
	mutation getIngestServerDetails($shopId: ID!, $serverId: ID!) {
		getIngestServerDetails(shopId: $shopId, serverId: $serverId) {
			name
      shopId
      status
      dns
      ip
      inputUrl
      outputUrl
    }
  }`

// export const GET_SHOPS = gql`
// 	mutation shops() {
// 		shops() {
// 		 shops {
//         nodes{
//           name
//           _id
//         }
//       }
//     }
//   }`

export const GET_SHOPS = gql`{ 
	shops{
    nodes{
      name
      _id
    }
  } 
}`


// export const GET_SHOPS = gql`
// 	mutation shops() {
// 		shops() {
// 		 shops {
//         nodes{
//           name
//           _id
//         }
//       }
//     }
//   }`
