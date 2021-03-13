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


export const GET_PRODUCTS = gql`
  query LiveSalesEvent($id: ID!, $shopId: ID!) {
    liveSalesEvent(id: $id, shopId: $shopId) {
      _id
      title
      streamTarget
      startDate
      claimWord
      includedUrl
      products{
        _id
        createdAt
        currentProductHash
        description
        isDeleted
        isVisible
        title
        
       	media{
          URLs{
            large
            medium
            original
            small
            thumbnail
          }
          _id
          priority
          productId
          variantId
        }
				 
        metafields{
          description
          key
          namespace
          scope
          value
          valueType
        }
        
        originCountry
        pageTitle
        productType
        publishedAt
        publishedProductHash
        shouldAppearInSitemap
        slug
        socialMetadata{
          message
          service
        }
        supportedFulfillmentTypes
        tags{
          nodes{
            _id
            displayTitle
            name
          }
        }
        title
        updatedAt
      
        variants{
          _id
          attributeLabel
          barcode
          createdAt
          height
          index
          isDeleted
          isVisible
          length
          media{
            URLs{
	            large
	            medium
	            original
	            small
	            thumbnail
            }
	          _id
	          priority
	          productId
	          variantId
          }
				 
          metafields{
            description
            key
            namespace
            scope
            value
            valueType
          }
          options{
            _id
            attributeLabel
            barcode
            createdAt
            height
            index
            isDeleted
            isVisible
            length
            media{
              URLs{
                large
                medium
                original
                small
                thumbnail
              }
              _id
              priority
              productId
              variantId
            }
            metafields{
              description
              key
              namespace
              scope
              value
              valueType
            }
            minOrderQuantity
            optionTitle
            sku
            title
            updatedAt
            weight
            width
            pricing{
              compareAtPrice{
                amount
                displayAmount
              }
              currency{
	              _id
	              code
	              decimal
	              format
	              rate
	              scale
	              symbol
	              thousand
              }
        
              displayPrice
              maxPrice
              minPrice
              price
            }
            isTaxable
            taxCode
            taxDescription
          }
          
	        originCountry
	        sku
	        title
	        updatedAt
	        weight
	        width
        
	        pricing{
	          displayPrice
	          maxPrice
	          minPrice
	          price
	        }
	        isTaxable
	        taxCode
	        taxDescription
        }

				vendor
        pricing{
          compareAtPrice{
            amount
            displayAmount
          }
        
          displayPrice
          maxPrice
          minPrice
          price
        }
 
        
      }
      description
      fbMessage
      includedUrl
      associatedSales
      smsPush
      
    }
	}`

