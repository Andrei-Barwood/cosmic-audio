/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* jshint maxlen: false */

'use strict';

var createAPIRequest = require('googleapis/lib/apirequest');

/**
 * Youtube Content ID API
 *
 * @classdesc API for YouTube partners. To use this API YouTube CMS account is required.
 * @namespace youtubePartner
 * @version  v1
 * @variation v1
 * @this Youtubepartner
 * @param {object=} options Options for Youtubepartner
 */
function Youtubepartner(options) {

  var self = this;
  this._options = options || {};

  this.assetLabels = {

    /**
     * youtubePartner.assetLabels.insert
     *
     * @desc Insert an asset label for an owner.
     *
     * @alias youtubePartner.assetLabels.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assetLabels',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assetLabels.list
     *
     * @desc Retrieves a list of all asset labels for an owner.
     *
     * @alias youtubePartner.assetLabels.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.labelPrefix - The labelPrefix parameter identifies the prefix of asset labels to retrieve.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.q - The q parameter specifies the query string to use to filter search results. YouTube searches for the query string in the labelName field of asset labels.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assetLabels',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.assetMatchPolicy = {

    /**
     * youtubePartner.assetMatchPolicy.get
     *
     * @desc Retrieves the match policy assigned to the specified asset by the content owner associated with the authenticated user. This information is only accessible to an owner of the asset.
     *
     * @alias youtubePartner.assetMatchPolicy.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving the match policy.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}/matchPolicy',
          method: 'GET'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assetMatchPolicy.patch
     *
     * @desc Updates the asset's match policy. If an asset has multiple owners, each owner may set its own match policy for the asset. YouTube then computes the match policy that is actually applied for the asset based on the territories where each owner owns the asset. This method supports patch semantics.
     *
     * @alias youtubePartner.assetMatchPolicy.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving the match policy.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}/matchPolicy',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assetMatchPolicy.update
     *
     * @desc Updates the asset's match policy. If an asset has multiple owners, each owner may set its own match policy for the asset. YouTube then computes the match policy that is actually applied for the asset based on the territories where each owner owns the asset.
     *
     * @alias youtubePartner.assetMatchPolicy.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving the match policy.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}/matchPolicy',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.assetRelationships = {

    /**
     * youtubePartner.assetRelationships.delete
     *
     * @desc Deletes a relationship between two assets.
     *
     * @alias youtubePartner.assetRelationships.delete
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetRelationshipId - The assetRelationshipId parameter specifies a value that uniquely identifies the relationship you are deleting.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    delete: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assetRelationships/{assetRelationshipId}',
          method: 'DELETE'
        },
        params: params,
        requiredParams: ['assetRelationshipId'],
        pathParams: ['assetRelationshipId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assetRelationships.insert
     *
     * @desc Creates a relationship that links two assets.
     *
     * @alias youtubePartner.assetRelationships.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assetRelationships',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assetRelationships.list
     *
     * @desc Retrieves a list of relationships for a given asset. The list contains relationships where the specified asset is either the parent (embedding) or child (embedded) asset in the relationship.
     *
     * @alias youtubePartner.assetRelationships.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the asset ID of the asset for which you are retrieving relationships.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. Set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assetRelationships',
          method: 'GET'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.assetSearch = {

    /**
     * youtubePartner.assetSearch.list
     *
     * @desc Searches for assets based on asset metadata. The method can retrieve all assets or only assets owned by the content owner. This method mimics the functionality of the advanced search feature on the Assets page in CMS.
     *
     * @alias youtubePartner.assetSearch.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.createdAfter - The createdAfter parameter restricts the set of returned assets to ones originally created on or after the specified datetime. For example: 2015-01-29T23:00:00Z
     * @param  {string=} params.createdBefore - The createdBefore parameter restricts the set of returned assets to ones originally created on or before the specified datetime. For example: 2015-01-29T23:00:00Z
     * @param  {boolean=} params.hasConflicts - The hasConflicts parameter enables you to only retrieve assets that have ownership conflicts. The only valid value is true. Setting the parameter value to false does not affect the results.
     * @param  {boolean=} params.includeAnyProvidedlabel - If includeAnyProvidedlabel parameter is set to true, will search for assets that contain any of the provided labels; else will search for assets that contain all the provided labels.
     * @param  {string=} params.isrcs - A comma-separated list of up to 50 ISRCs. If you specify a value for this parameter, the API server ignores any values set for the following parameters: q, includeAnyProvidedLabel, hasConflicts, labels, metadataSearchFields, sort, and type.
     * @param  {string=} params.labels - The labels parameter specifies the assets with certain asset labels that you want to retrieve. The parameter value is a comma-separated list of asset labels.
     * @param  {string=} params.metadataSearchFields - The metadataSearchField parameter specifies which metadata fields to search by. It is a comma-separated list of metadata field and value pairs connected by colon(:). For example: customId:my_custom_id,artist:Dandexx
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.ownershipRestriction - The ownershipRestriction parameter specifies the ownership filtering option for the search. By default the search is performed in the assets owned by currently authenticated user only.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. Set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {string=} params.q - YouTube searches within the id, type, and customId fields for all assets as well as in numerous other metadata fields – such as actor, album, director, isrc, and tmsId – that vary for different types of assets (movies, music videos, etc.).
     * @param  {string=} params.sort - The sort parameter specifies how the search results should be sorted. Note that results are always sorted in descending order.
     * @param  {string=} params.type - The type parameter specifies the types of assets that you want to retrieve. The parameter value is a comma-separated list of asset types.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assetSearch',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.assets = {

    /**
     * youtubePartner.assets.get
     *
     * @desc Retrieves the metadata for the specified asset. Note that if the request identifies an asset that has been merged with another asset, meaning that YouTube identified the requested asset as a duplicate, then the request retrieves the merged, or synthesized, asset.
     *
     * @alias youtubePartner.assets.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset being retrieved.
     * @param  {string=} params.fetchMatchPolicy - The fetchMatchPolicy parameter specifies the version of the asset's match policy that should be returned in the API response.
     * @param  {string=} params.fetchMetadata - The fetchMetadata parameter specifies the version of the asset's metadata that should be returned in the API response. In some cases, YouTube receives metadata for an asset from multiple sources, such as when different partners own the asset in different territories.
     * @param  {string=} params.fetchOwnership - The fetchOwnership parameter specifies the version of the asset's ownership data that should be returned in the API response. As with asset metadata, YouTube can receive asset ownership data from multiple sources.
     * @param  {boolean=} params.fetchOwnershipConflicts - The fetchOwnershipConflicts parameter allows you to retrieve information about ownership conflicts.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assets.insert
     *
     * @desc Inserts an asset with the specified metadata. After inserting an asset, you can set its ownership data and match policy.
     *
     * @alias youtubePartner.assets.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assets.list
     *
     * @desc Retrieves a list of assets based on asset metadata. The method can retrieve all assets or only assets owned by the content owner.  Note that in cases where duplicate assets have been merged, the API response only contains the synthesized asset. (It does not contain the constituent assets that were merged into the synthesized asset.)
     *
     * @alias youtubePartner.assets.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.fetchMatchPolicy - The fetchMatchPolicy parameter specifies the version of the asset's match policy that should be returned in the API response.
     * @param  {string=} params.fetchMetadata - The fetchMetadata parameter specifies the version of the asset's metadata that should be returned in the API response. In some cases, YouTube receives metadata for an asset from multiple sources, such as when different partners own the asset in different territories.
     * @param  {string=} params.fetchOwnership - The fetchOwnership parameter specifies the version of the asset's ownership data that should be returned in the API response. As with asset metadata, YouTube can receive asset ownership data from multiple sources.
     * @param  {boolean=} params.fetchOwnershipConflicts - The fetchOwnershipConflicts parameter allows you to retrieve information about ownership conflicts.
     * @param  {string} params.id - The id parameter specifies a comma-separated list of YouTube Asset IDs that identify the assets you want to retrieve. As noted in the method description, if you try to retrieve an asset that YouTube identified as a duplicate and merged with another asset, the API response only returns the synthesized asset. In that case, the aliasId property in the asset resource specifies a list of other asset IDs that can be used to identify that asset.  Also note that the API response does not contain duplicates. As such, if your request identifies three asset IDs, and all of those have been merged into a single asset, then the API response identifies one matching asset.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets',
          method: 'GET'
        },
        params: params,
        requiredParams: ['id'],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assets.patch
     *
     * @desc Updates the metadata for the specified asset. This method supports patch semantics.
     *
     * @alias youtubePartner.assets.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset being updated.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.assets.update
     *
     * @desc Updates the metadata for the specified asset.
     *
     * @alias youtubePartner.assets.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset being updated.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.campaigns = {

    /**
     * youtubePartner.campaigns.delete
     *
     * @desc Deletes a specified campaign for an owner.
     *
     * @alias youtubePartner.campaigns.delete
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.campaignId - The campaignId parameter specifies the YouTube campaign ID of the campaign being deleted.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    delete: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/campaigns/{campaignId}',
          method: 'DELETE'
        },
        params: params,
        requiredParams: ['campaignId'],
        pathParams: ['campaignId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.campaigns.get
     *
     * @desc Retrieves a particular campaign for an owner.
     *
     * @alias youtubePartner.campaigns.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.campaignId - The campaignId parameter specifies the YouTube campaign ID of the campaign being retrieved.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/campaigns/{campaignId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['campaignId'],
        pathParams: ['campaignId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.campaigns.insert
     *
     * @desc Insert a new campaign for an owner using the specified campaign data.
     *
     * @alias youtubePartner.campaigns.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/campaigns',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.campaigns.list
     *
     * @desc Retrieves a list of campaigns for an owner.
     *
     * @alias youtubePartner.campaigns.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. For example, set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/campaigns',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.campaigns.patch
     *
     * @desc Update the data for a specific campaign. This method supports patch semantics.
     *
     * @alias youtubePartner.campaigns.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.campaignId - The campaignId parameter specifies the YouTube campaign ID of the campaign being retrieved.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/campaigns/{campaignId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['campaignId'],
        pathParams: ['campaignId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.campaigns.update
     *
     * @desc Update the data for a specific campaign.
     *
     * @alias youtubePartner.campaigns.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.campaignId - The campaignId parameter specifies the YouTube campaign ID of the campaign being retrieved.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/campaigns/{campaignId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['campaignId'],
        pathParams: ['campaignId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.claimHistory = {

    /**
     * youtubePartner.claimHistory.get
     *
     * @desc Retrieves the claim history for a specified claim.
     *
     * @alias youtubePartner.claimHistory.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.claimId - The claimId parameter specifies the YouTube claim ID of the claim for which you are retrieving the claim history.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claimHistory/{claimId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['claimId'],
        pathParams: ['claimId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.claimSearch = {

    /**
     * youtubePartner.claimSearch.list
     *
     * @desc Retrieves a list of claims that match the search criteria. You can search for claims that are associated with a specific asset or video or that match a specified query string.
     *
     * @alias youtubePartner.claimSearch.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving claims.
     * @param  {string=} params.contentType - The contentType parameter specifies the content type of claims that you want to retrieve.
     * @param  {string=} params.createdAfter - The createdAfter parameter allows you to restrict the set of returned claims to ones originally created after the specified date.
     * @param  {string=} params.createdBefore - The createdBefore parameter allows you to restrict the set of returned claims to ones originally created before the specified date.
     * @param  {string=} params.inactiveReasons - The inactiveReasons parameter allows you to specify what kind of inactive claims you want to find based on the reasons why the claims became inactive.
     * @param  {boolean=} params.includeThirdPartyClaims - Used along with the videoId parameter this parameter determines whether or not to include third party claims in the search results.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.origin - The origin parameter specifies the origins you want to find claims for. It is a comma-separated list of origin values.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. For example, set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {string=} params.q - The q parameter specifies the query string to use to filter search results. YouTube searches for the query string in the following claim fields: video_title, video_keywords, user_name, isrc, iswc, grid, custom_id, and in the content owner's email address.
     * @param  {string=} params.referenceId - The referenceId parameter specifies the YouTube reference ID of the reference for which you are retrieving claims.
     * @param  {string=} params.sort - The sort parameter specifies the method that will be used to order resources in the API response. The default value is date. However, if the status parameter value is either appealed, disputed, pending, potential, or routedForReview, then results will be sorted by the time that the claim review period expires.
     * @param  {string=} params.status - The status parameter restricts your results to only claims in the specified status.
     * @param  {string=} params.videoId - The videoId parameter specifies comma-separated list of YouTube video IDs for which you are retrieving claims.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claimSearch',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.claims = {

    /**
     * youtubePartner.claims.get
     *
     * @desc Retrieves a specific claim by ID.
     *
     * @alias youtubePartner.claims.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.claimId - The claimId parameter specifies the claim ID of the claim being retrieved.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claims/{claimId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['claimId'],
        pathParams: ['claimId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.claims.insert
     *
     * @desc Creates a claim. The video being claimed must have been uploaded to a channel associated with the same content owner as the API user sending the request. You can set the claim's policy in any of the following ways: - Use the claim resource's policy property to identify a saved policy by its unique ID. - Use the claim resource's policy property to specify a custom set of rules.
     *
     * @alias youtubePartner.claims.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {boolean=} params.isManualClaim - restricted
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claims',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.claims.list
     *
     * @desc Retrieves a list of claims administered by the content owner associated with the currently authenticated user. Results are sorted in descending order of creation time.
     *
     * @alias youtubePartner.claims.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.assetId - Use the claimSearch.list method's assetId parameter to search for claim snippets by asset ID. You can then retrieve the claim resources for those claims by using this method's id parameter to specify a comma-separated list of claim IDs.
     * @param  {string=} params.id - The id parameter specifies a list of comma-separated YouTube claim IDs to retrieve.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. For example, set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {string=} params.q - Use the claimSearch.list method's q parameter to search for claim snippets that match a particular query string. You can then retrieve the claim resources for those claims by using this method's id parameter to specify a comma-separated list of claim IDs.
     * @param  {string=} params.videoId - Use the claimSearch.list method's videoId parameter to search for claim snippets by video ID. You can then retrieve the claim resources for those claims by using this method's id parameter to specify a comma-separated list of claim IDs.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claims',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.claims.patch
     *
     * @desc Updates an existing claim by either changing its policy or its status. You can update a claim's status from active to inactive to effectively release the claim. This method supports patch semantics.
     *
     * @alias youtubePartner.claims.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.claimId - The claimId parameter specifies the claim ID of the claim being updated.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claims/{claimId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['claimId'],
        pathParams: ['claimId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.claims.update
     *
     * @desc Updates an existing claim by either changing its policy or its status. You can update a claim's status from active to inactive to effectively release the claim.
     *
     * @alias youtubePartner.claims.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.claimId - The claimId parameter specifies the claim ID of the claim being updated.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/claims/{claimId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['claimId'],
        pathParams: ['claimId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.contentOwnerAdvertisingOptions = {

    /**
     * youtubePartner.contentOwnerAdvertisingOptions.get
     *
     * @desc Retrieves advertising options for the content owner associated with the authenticated user.
     *
     * @alias youtubePartner.contentOwnerAdvertisingOptions.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/contentOwnerAdvertisingOptions',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.contentOwnerAdvertisingOptions.patch
     *
     * @desc Updates advertising options for the content owner associated with the authenticated API user. This method supports patch semantics.
     *
     * @alias youtubePartner.contentOwnerAdvertisingOptions.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/contentOwnerAdvertisingOptions',
          method: 'PATCH'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.contentOwnerAdvertisingOptions.update
     *
     * @desc Updates advertising options for the content owner associated with the authenticated API user.
     *
     * @alias youtubePartner.contentOwnerAdvertisingOptions.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/contentOwnerAdvertisingOptions',
          method: 'PUT'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.contentOwners = {

    /**
     * youtubePartner.contentOwners.get
     *
     * @desc Retrieves information about the specified content owner.
     *
     * @alias youtubePartner.contentOwners.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.contentOwnerId - The contentOwnerId parameter specifies a value that uniquely identifies the content owner.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/contentOwners/{contentOwnerId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['contentOwnerId'],
        pathParams: ['contentOwnerId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.contentOwners.list
     *
     * @desc Retrieves a list of content owners that match the request criteria.
     *
     * @alias youtubePartner.contentOwners.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {boolean=} params.fetchMine - The fetchMine parameter restricts the result set to content owners associated with the currently authenticated API user.
     * @param  {string=} params.id - The id parameter specifies a comma-separated list of YouTube content owner IDs to retrieve.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/contentOwners',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.liveCuepoints = {

    /**
     * youtubePartner.liveCuepoints.insert
     *
     * @desc Inserts a cuepoint into a live broadcast.
     *
     * @alias youtubePartner.liveCuepoints.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.channelId - The channelId parameter identifies the channel that owns the broadcast into which the cuepoint is being inserted.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners. You can obtain the content owner ID that will serve as the parameter value by calling the YouTube Content ID API's contentOwners.list method.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/liveCuepoints',
          method: 'POST'
        },
        params: params,
        requiredParams: ['channelId'],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.metadataHistory = {

    /**
     * youtubePartner.metadataHistory.list
     *
     * @desc Retrieves a list of all metadata provided for an asset, regardless of which content owner provided the data.
     *
     * @alias youtubePartner.metadataHistory.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving a metadata history.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/metadataHistory',
          method: 'GET'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.orders = {

    /**
     * youtubePartner.orders.delete
     *
     * @desc Delete an order, which moves orders to inactive state and removes any associated video.
     *
     * @alias youtubePartner.orders.delete
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - ContentOwnerId that super admin acts in behalf of.
     * @param  {string} params.orderId - Id of the order to delete.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    delete: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/orders/{orderId}',
          method: 'DELETE'
        },
        params: params,
        requiredParams: ['orderId'],
        pathParams: ['orderId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.orders.get
     *
     * @desc Retrieve the details of an existing order.
     *
     * @alias youtubePartner.orders.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - ContentOnwerId that super admin acts in behalf of.
     * @param  {string} params.orderId - The id of the order.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/orders/{orderId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['orderId'],
        pathParams: ['orderId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.orders.insert
     *
     * @desc Creates a new basic order entry in the YouTube premium asset order management system. You must supply at least a country and channel in the new order.
     *
     * @alias youtubePartner.orders.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - ContentOnwerId that super admin acts in behalf of.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/orders',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.orders.list
     *
     * @desc Return a list of orders, filtered by the parameters below, may return more than a single page of results.
     *
     * @alias youtubePartner.orders.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.channelId - Filter results to only a specific channel ( use encrypted ID).
     * @param  {string=} params.contentType - Filter the results by type, possible values are SHOW or MOVIE.
     * @param  {string=} params.country - Filter results by country, two letter ISO country codes are used.
     * @param  {string=} params.customId - Filter result by orders that have this custom ID.
     * @param  {string=} params.onBehalfOfContentOwner - ContentOnwerId that super admin acts in behalf of.
     * @param  {string=} params.pageToken - The continuation token is an optional value that is only used to page through large result sets.  - To retrieve the next page of results for a request, set this parameter to the value of the nextPageToken value from the previous response. - To get the previous page of results, set this parameter to the value of the previousPageToken value from the previous response.
     * @param  {string=} params.priority - Filter results by priority. P0, P1, P2, P3 and P4 are the acceptable options.
     * @param  {string=} params.productionHouse - Filter results by a particular production house. Specified by the name of the production house.
     * @param  {string=} params.q - Filter results to only orders that contain this string in the title.
     * @param  {string=} params.status - Filter results to have this status, available options are STATUS_AVAILED, STATUS_ORDERED, STATUS_RECEIVED, STATUS_READY_FOR_QC, STATUS_MOC_FIX, STATUS_PARTNER_FIX, STATUS_YOUTUBE_FIX, STATUS_QC_APPROVED, STATUS_INACTIVE, STATUS_INGESTION_COMPLETE, STATUS_REORDERED
     * @param  {string=} params.videoId - Filter results to orders that are associated with this YouTube external video id.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/orders',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.orders.patch
     *
     * @desc Update the values in an existing order. This method supports patch semantics.
     *
     * @alias youtubePartner.orders.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - ContentOwnerId that super admin acts in behalf of.
     * @param  {string} params.orderId - The id of the order.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/orders/{orderId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['orderId'],
        pathParams: ['orderId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.orders.update
     *
     * @desc Update the values in an existing order.
     *
     * @alias youtubePartner.orders.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - ContentOwnerId that super admin acts in behalf of.
     * @param  {string} params.orderId - The id of the order.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/orders/{orderId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['orderId'],
        pathParams: ['orderId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.ownership = {

    /**
     * youtubePartner.ownership.get
     *
     * @desc Retrieves the ownership data provided for the specified asset by the content owner associated with the authenticated user.
     *
     * @alias youtubePartner.ownership.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID for which you are retrieving ownership data.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}/ownership',
          method: 'GET'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.ownership.patch
     *
     * @desc Provides new ownership information for the specified asset. Note that YouTube may receive ownership information from multiple sources. For example, if an asset has multiple owners, each owner might send ownership data for the asset. YouTube algorithmically combines the ownership data received from all of those sources to generate the asset's canonical ownership data, which should provide the most comprehensive and accurate representation of the asset's ownership. This method supports patch semantics.
     *
     * @alias youtubePartner.ownership.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset being updated.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}/ownership',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.ownership.update
     *
     * @desc Provides new ownership information for the specified asset. Note that YouTube may receive ownership information from multiple sources. For example, if an asset has multiple owners, each owner might send ownership data for the asset. YouTube algorithmically combines the ownership data received from all of those sources to generate the asset's canonical ownership data, which should provide the most comprehensive and accurate representation of the asset's ownership.
     *
     * @alias youtubePartner.ownership.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset being updated.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/assets/{assetId}/ownership',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: ['assetId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.ownershipHistory = {

    /**
     * youtubePartner.ownershipHistory.list
     *
     * @desc Retrieves a list of the ownership data for an asset, regardless of which content owner provided the data. The list only includes the most recent ownership data for each content owner. However, if the content owner has submitted ownership data through multiple data sources (API, content feeds, etc.), the list will contain the most recent data for each content owner and data source.
     *
     * @alias youtubePartner.ownershipHistory.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving an ownership data history.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/ownershipHistory',
          method: 'GET'
        },
        params: params,
        requiredParams: ['assetId'],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.policies = {

    /**
     * youtubePartner.policies.get
     *
     * @desc Retrieves the specified saved policy.
     *
     * @alias youtubePartner.policies.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.policyId - The policyId parameter specifies a value that uniquely identifies the policy being retrieved.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/policies/{policyId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['policyId'],
        pathParams: ['policyId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.policies.insert
     *
     * @desc Creates a saved policy.
     *
     * @alias youtubePartner.policies.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/policies',
          method: 'POST'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.policies.list
     *
     * @desc Retrieves a list of the content owner's saved policies.
     *
     * @alias youtubePartner.policies.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.id - The id parameter specifies a comma-separated list of saved policy IDs to retrieve. Only policies belonging to the currently authenticated content owner will be available.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.sort - The sort parameter specifies how the search results should be sorted.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/policies',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.policies.patch
     *
     * @desc Updates the specified saved policy. This method supports patch semantics.
     *
     * @alias youtubePartner.policies.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.policyId - The policyId parameter specifies a value that uniquely identifies the policy being updated.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/policies/{policyId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['policyId'],
        pathParams: ['policyId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.policies.update
     *
     * @desc Updates the specified saved policy.
     *
     * @alias youtubePartner.policies.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.policyId - The policyId parameter specifies a value that uniquely identifies the policy being updated.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/policies/{policyId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['policyId'],
        pathParams: ['policyId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.publishers = {

    /**
     * youtubePartner.publishers.get
     *
     * @desc Retrieves information about the specified publisher.
     *
     * @alias youtubePartner.publishers.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.publisherId - The publisherId parameter specifies a publisher ID that uniquely identifies the publisher being retrieved.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/publishers/{publisherId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['publisherId'],
        pathParams: ['publisherId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.publishers.list
     *
     * @desc Retrieves a list of publishers that match the request criteria. This method is analogous to a publisher search function.
     *
     * @alias youtubePartner.publishers.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.caeNumber - The caeNumber parameter specifies the CAE number of the publisher that you want to retrieve.
     * @param  {string=} params.id - The id parameter specifies a comma-separated list of YouTube publisher IDs to retrieve.
     * @param  {string=} params.ipiNumber - The ipiNumber parameter specifies the IPI number of the publisher that you want to retrieve.
     * @param  {integer=} params.maxResults - The maxResults parameter specifies the maximum number of results to return per page.
     * @param  {string=} params.namePrefix - The namePrefix parameter indicates that the API should only return publishers whose name starts with this prefix.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. Set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/publishers',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.referenceConflicts = {

    /**
     * youtubePartner.referenceConflicts.get
     *
     * @desc Retrieves information about the specified reference conflict.
     *
     * @alias youtubePartner.referenceConflicts.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.referenceConflictId - The referenceConflictId parameter specifies the YouTube reference conflict ID of the reference conflict being retrieved.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/referenceConflicts/{referenceConflictId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['referenceConflictId'],
        pathParams: ['referenceConflictId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.referenceConflicts.list
     *
     * @desc Retrieves a list of unresolved reference conflicts.
     *
     * @alias youtubePartner.referenceConflicts.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. Set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/referenceConflicts',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.references = {

    /**
     * youtubePartner.references.get
     *
     * @desc Retrieves information about the specified reference.
     *
     * @alias youtubePartner.references.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.referenceId - The referenceId parameter specifies the YouTube reference ID of the reference being retrieved.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/references/{referenceId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['referenceId'],
        pathParams: ['referenceId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.references.insert
     *
     * @desc Creates a reference in one of the following ways: - If your request is uploading a reference file, YouTube creates the reference from the provided content. In this flow, you can use either the multipart or resumable upload flows to provide the reference content. - If you want to create a reference using a claimed video as the reference content, use the claimId parameter to identify the claim.
     *
     * @alias youtubePartner.references.insert
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.claimId - The claimId parameter specifies the YouTube claim ID of an existing claim from which a reference should be created. (The claimed video is used as the reference content.)
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {object} params.resource - Media resource metadata
     * @param  {object} params.media - Media object
     * @param  {string} params.media.mimeType - Media mime-type
     * @param  {string|object} params.media.body - Media body contents
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    insert: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/references',
          method: 'POST'
        },
        params: params,
        mediaUrl: 'https://www.googleapis.com/upload/youtube/partner/v1/references',
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.references.list
     *
     * @desc Retrieves a list of references by ID or the list of references for the specified asset.
     *
     * @alias youtubePartner.references.list
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object=} params - Parameters for request
     * @param  {string=} params.assetId - The assetId parameter specifies the YouTube asset ID of the asset for which you are retrieving references.
     * @param  {string=} params.id - The id parameter specifies a comma-separated list of YouTube reference IDs to retrieve.
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string=} params.pageToken - The pageToken parameter specifies a token that identifies a particular page of results to return. Set this parameter to the value of the nextPageToken value from the previous API response to retrieve the next page of search results.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    list: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/references',
          method: 'GET'
        },
        params: params,
        requiredParams: [],
        pathParams: [],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.references.patch
     *
     * @desc Updates a reference. This method supports patch semantics.
     *
     * @alias youtubePartner.references.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.referenceId - The referenceId parameter specifies the YouTube reference ID of the reference being updated.
     * @param  {boolean=} params.releaseClaims - The releaseClaims parameter indicates that you want to release all match claims associated with this reference. This parameter only works when the claim's status is being updated to 'inactive' - you can then set the parameter's value to true to release all match claims produced by this reference.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/references/{referenceId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['referenceId'],
        pathParams: ['referenceId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.references.update
     *
     * @desc Updates a reference.
     *
     * @alias youtubePartner.references.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.referenceId - The referenceId parameter specifies the YouTube reference ID of the reference being updated.
     * @param  {boolean=} params.releaseClaims - The releaseClaims parameter indicates that you want to release all match claims associated with this reference. This parameter only works when the claim's status is being updated to 'inactive' - you can then set the parameter's value to true to release all match claims produced by this reference.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/references/{referenceId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['referenceId'],
        pathParams: ['referenceId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };

  this.videoAdvertisingOptions = {

    /**
     * youtubePartner.videoAdvertisingOptions.get
     *
     * @desc Retrieves advertising settings for the specified video.
     *
     * @alias youtubePartner.videoAdvertisingOptions.get
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.videoId - The videoId parameter specifies the YouTube video ID of the video for which you are retrieving advertising settings.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    get: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/videoAdvertisingOptions/{videoId}',
          method: 'GET'
        },
        params: params,
        requiredParams: ['videoId'],
        pathParams: ['videoId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.videoAdvertisingOptions.getEnabledAds
     *
     * @desc Retrieves details about the types of allowed ads for a specified partner- or user-uploaded video.
     *
     * @alias youtubePartner.videoAdvertisingOptions.getEnabledAds
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.videoId - The videoId parameter specifies the YouTube video ID of the video for which you are retrieving advertising options.
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    getEnabledAds: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/videoAdvertisingOptions/{videoId}/getEnabledAds',
          method: 'GET'
        },
        params: params,
        requiredParams: ['videoId'],
        pathParams: ['videoId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.videoAdvertisingOptions.patch
     *
     * @desc Updates the advertising settings for the specified video. This method supports patch semantics.
     *
     * @alias youtubePartner.videoAdvertisingOptions.patch
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.videoId - The videoId parameter specifies the YouTube video ID of the video for which you are updating advertising settings.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    patch: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/videoAdvertisingOptions/{videoId}',
          method: 'PATCH'
        },
        params: params,
        requiredParams: ['videoId'],
        pathParams: ['videoId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    },

    /**
     * youtubePartner.videoAdvertisingOptions.update
     *
     * @desc Updates the advertising settings for the specified video.
     *
     * @alias youtubePartner.videoAdvertisingOptions.update
     * @memberOf! youtubePartner(v1)
     *
     * @param  {object} params - Parameters for request
     * @param  {string=} params.onBehalfOfContentOwner - The onBehalfOfContentOwner parameter identifies the content owner that the user is acting on behalf of. This parameter supports users whose accounts are associated with multiple content owners.
     * @param  {string} params.videoId - The videoId parameter specifies the YouTube video ID of the video for which you are updating advertising settings.
     * @param  {object} params.resource - Request body data
     * @param  {callback} callback - The callback that handles the response.
     * @return {object} Request object
     */
    update: function(params, callback) {
      var parameters = {
        options: {
          url: 'https://www.googleapis.com/youtube/partner/v1/videoAdvertisingOptions/{videoId}',
          method: 'PUT'
        },
        params: params,
        requiredParams: ['videoId'],
        pathParams: ['videoId'],
        context: self
      };

      return createAPIRequest(parameters, callback);
    }

  };
}

/**
 * Exports Youtubepartner object
 * @type Youtubepartner
 */
module.exports = Youtubepartner;