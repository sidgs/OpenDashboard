/*******************************************************************************
 * Copyright 2015 Unicon (R) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 * http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *******************************************************************************/
(function(angular, JSON, Math) {
  'use strict';
  
  var genericHandleError = function (error) {
	if (error) {
	  error['isError'] = true;
	}
	return error;
  };
	
   angular
	.module('OpenDashboard')
	.service('ProviderService', function($log, $http, OpenDashboard_API) {

		return {
			getProviderTypes : function() {
			  // TODO - make this dynamic
			  var providers = [];
			  var courseProviders = {
			    type : 'COURSE',
			    key : 'LABEL_COURSE_PROVIDERS_KEY',
			    desc : 'LABEL_COURSE_PROVIDERS_DESC'
			  };
			  var eventProviders = {
			    type : 'EVENT',
			    key : 'LABEL_EVENT_PROVIDERS_KEY',
			    desc : 'LABEL_EVENT_PROVIDERS_DESC'
			  };
			  var modelOutputProviders = {
			    type : 'MODELOUTPUT',
			    key : 'LABEL_MODELOUTPUT_PROVIDERS_KEY',
			    desc : 'LABEL_MODELOUTPUT_PROVIDERS_DESC'
			  };
			  var rosterProviders = {
			    type : 'ROSTER',
			    key : 'LABEL_ROSTER_PROVIDERS_KEY',
			    desc : 'LABEL_ROSTER_PROVIDERS_DESC'
			  };
			  var forumProviders = {
 			    type : 'FORUM',
 			    key : 'LABEL_FORUM_PROVIDERS_KEY',
 			    desc : 'LABEL_FORUM_PROVIDERS_DESC'
 			  };
			  
			  providers.push(courseProviders);
			  providers.push(eventProviders);
			  providers.push(modelOutputProviders);
			  providers.push(rosterProviders);
			  providers.push(forumProviders);
			  
			  return providers;
		    },
			getProviders: function(type) {
				
					var url = '/api/providers/'+type;
			    	var promise = $http({
			    		method  : 'GET',
			    		url		: url,
			    		headers : { 'Content-Type': 'application/json'}
			    	})
			    	.then(function (response) {
			    		if (response && response.data) {
				    		return response.data;		    			
			    		}
			    		$log.debug('No providers found for '+type);
			    		return null;
			    	}, genericHandleError);
					return promise;
			},
			getProvider: function(type,key) {
				
				var url = '/api/providers/'+type+'/'+key;
				var promise = $http({
					method  : 'GET',
					url		: url,
					headers : { 'Content-Type': 'application/json'}
				})
				.then(function (response) {
					if (response && response.data) {
						return response.data;		    			
					}
					$log.debug('No provider found for '+type+' '+key);
					return null;
				}, genericHandleError);
				return promise;
			}
		}
	});

angular
  .module('OpenDashboard')
    .service('CourseDataService', function($log, $http, OpenDashboard_API) {
      return {
    	getMemberships: function(tenantId,userId) {
		  var url = '/api/tenants/'+tenantId+'/user/'+userId+'/memberships';
		  var promise = $http({
		    method  : 'GET',
			url		: url,
			headers : { 'Content-Type': 'application/json'}
		  })
		  .then(
		  function (response) {
		    if (response && response.data) {
			  var contexts = [];
			  angular.forEach(response.data, function(value,key) {
			    contexts.push(value);
			  });
			    			
		      return contexts;		    			
			}
			$log.debug('No contexts found for user');
			return null;
	      }, 
	      function (error) {
	    	$log.debug(error);
	    	var errorObj = {};
	    	errorObj['isError'] = true;
	    	errorObj['errorCode'] = error.data.errors[0];
	    	
	    	return errorObj;
	      });
		  return promise;
		}
	}
});
  
angular
  .module('OpenDashboard')
    .service('ForumDataService', function($log, $http, OpenDashboard_API) {
      return {
    	getAllMessages: function(tenantId,contextMappingId) {
		  var url = '/api/tenants/'+tenantId+'/contexts/'+contextMappingId+'/forums/messages';
		  var promise = $http({
		    method  : 'GET',
			url		: url,
			headers : { 'Content-Type': 'application/json'}
		  })
		  .then(
		  function (response) {
		    if (response && response.data) {			    			
		      return response.data;		    			
			}
			$log.debug('No messages found');
			return null;
	      }, 
	      function (error) {
	    	$log.debug(error);
	    	var errorObj = {};
	    	errorObj['isError'] = true;
	    	errorObj['errorCode'] = error.data.errors[0];
	    	
	    	return errorObj;
	      });
		  return promise;
		}
	}
});

angular
  .module('OpenDashboard')
    .service('EventService',function($log, $http, _) {
      return {
    	 
    	 
    	  postCaliperEvent2 : function (options, caliperEvent) {
      		  
              var url = '/api/proxy/event';
              var promise = $http({
                method  : 'POST',
            	url		: url,
            	data    : JSON.stringify({
			                 options: options,
			                 caliperEvent: caliperEvent
			              }),
            	headers : { 'Content-Type': 'application/json'}
              })
              .then(function (response) {
            	  alert("response: " + response.status);
                  $log.debug(response);
                  if (response && response.data) {
                    return response.data.content;	    	
                  }
            	  return null;
            	}, function (response) {
            		alert(response.status);
            	
        	    	//$log.debug(error);
        	    	var errorObj = {};
        	    	errorObj['isError'] = true;
        	    	//errorObj['errorCode'] = error.data.errors[0];
        	    	
        	    	return errorObj;
            	}
              );
              
        		return promise;
    		},  
    	  
    		
    	successCallback : function(response) {
    		alert (response);
    	},	
    	
    	errorCallback : function(response) {
        		alert (response);
        	},	
    	
    	  postCaliperEvent : function (options, caliperEvent) {
    		      		  
              var url = '/api/proxy/event';
              var promise = $http({
                method  : 'POST',
            	url		: url,
            	data    : JSON.stringify({
			                 options: options,
			                 caliperEvent: caliperEvent
			              }),
            	headers : { 'Content-Type': 'application/json'}
              }).then(function (response) {
                  $log.debug(response);
                  $log.debug(response.data[0]);
                  
                  
                  if (response && response.data) {
                    return response.data[0];	    	
                  }
            	  return null;
            	}, function (error) {
        	    	$log.debug(error);
        	    	$log.debug("TEST2");        	    	
        	    	var errorObj = {};
        	    	errorObj['isError'] = true;
        	    	errorObj['errorCode'] = error.data.errors[0];
        	    	
        	    	return errorObj;
            	}
              );
        		return promise;
    	  },  
    	  
    	  
    	  
    	  
        getEventsForCourse : function (options, courseId, page, size) {
          var p = page || 0;
          var s = size || 10;
    	
          var url = '/api/event/course/'+courseId+'?page='+p+'&size='+s;
          var promise = $http({
            method  : 'POST',
        	url		: url,
        	data    : JSON.stringify(options),
        	headers : { 'Content-Type': 'application/json'}
          })
          .then(function (response) {
              $log.debug(response);
              if (response && response.data) {
                return response.data.content;	    	
              }
        	  return null;
        	}, function (error) {
    	    	$log.debug(error);
    	    	var errorObj = {};
    	    	errorObj['isError'] = true;
    	    	errorObj['errorCode'] = error.data.errors[0];
    	    	
    	    	return errorObj;
        	}
          );
    		return promise;
		},
				getEventsForUser : function (options, userId, page, size) {
					$log.debug(options);
					$log.debug(userId);
					$log.debug(page);
					$log.debug(size);
					var p = page || 0;
		            var s = size || 10;
		
				
					var url = '/api/event/user/'+userId+'?page='+p+'&size='+s;
			    	var promise = $http({
			    		method  : 'POST',
			    		url		: url,
			    		data    : JSON.stringify(options),
			    		headers : { 'Content-Type': 'application/json'}
			    	})
			    	.then(function (response) {
			    		if (response && response.data) {
			    		  return response.data.content;		    	
			    		}
			    		return null;
			    	}, genericHandleError);
					return promise;
				},
				getEventsForCourseAndUser : function (options, courseId, userId, page, size) {
					$log.debug(options);
					$log.debug(courseId);
					$log.debug(userId);
					$log.debug(page);
					$log.debug(size);
					var p = page || 0;
		            var s = size || 10;
		
				
					var url = '/api/event/course/'+courseId+'/user/'+userId+'?page='+p+'&size='+s;
			    	var promise = $http({
			    		method  : 'POST',
			    		url		: url,
			    		data    : JSON.stringify(options),
			    		headers : { 'Content-Type': 'application/json'}
			    	})
			    	.then(function (response) {
			    		if (response && response.data) {
			    		  return response.data.content;	    	
			    		}
			    		return null;
			    	}, genericHandleError);
					return promise;
				},
				getCourseEventsStatsForCourse : function (options, courseId, userId, page, size) {
					$log.debug("inside get eventsstats for coure");
					$log.debug(options);
					$log.debug(courseId);
					$log.debug(userId);
					$log.debug(page);
					$log.debug(size);
					var p = page || 0;
		            var s = size || 10;
		
				    //http://localhost:8080/portal/site/de5db688-b7ec-449a-94d3-deb9af208f2b
					var url = '/api/event/course/{courseid}/stats';
			    	var promise = $http({
			    		method  : 'POST',
			    		url		: url,
			    		data    : JSON.stringify(options),
			    		headers : { 'Content-Type': 'application/json'}
			    	})
			    	.then(function (response) {
			    		if (response && response.data) {
			    			//alert(response);
			    			//alert(response.data);
			    			//alert(response.data.content);
			    		  return response.data;	    	
			    		}
			    		return;
			    	}, genericHandleError);
					return promise;
				},
				groupByAndMap: function(events,groupByFunction,mapFunction) {
				
					if (!groupByFunction) {
						groupByFunction = function (event) {
							$log.debug(event);
							//by default groupBy stored date
							var timestamp = event.timestamp;
				    		return timestamp.slice(0, timestamp.indexOf("T"));
						};
					}
					
					if (!mapFunction) {
						mapFunction = function(value,key){
							// by default map to the number of events for the value
		    				var numberOfEvents = 0;
		    				if (value && value != null) {
		    					numberOfEvents = value.length;
		    				}
		    				
		    				return {
		    					x:key,
		    					y: [numberOfEvents]
		    				};
		    			};
					}
					
					return _.chain(events)
							.groupBy(groupByFunction)
							.map(mapFunction)
							.value();
				}
			}
		});
		  angular
		  .module('OpenDashboard')
		  	.service('ModelOutputDataService', function($log, $http, OpenDashboard_API) {

				return {
					getModelOutputForCourse: function(options,courseId,page,size) {
						
						$log.debug(options);
						$log.debug(courseId);
						$log.debug(page);
						$log.debug(size);
						var p = page || 0;
		                var s = size || 10;

					
						var url = '/api/modeloutput/course/'+courseId+'?page='+p+'&size='+s;
				    	var promise = $http({
				    		method  : 'POST',
				    		url		: url,
				    		data    : JSON.stringify(options),
				    		headers : { 'Content-Type': 'application/json'}
				    	})
				    	.then(function (response) {
				    		if (response && response.data) {
				    			return response.data.content;		    	
				    		}
				    		$log.debug('No model output');
				    		return null;
				    	}, genericHandleError);
						return promise;
					},
					getModelOutputForUser: function(options,userId,page,size) {
						
						$log.debug(options);
						$log.debug(userId);
						$log.debug(page);
						$log.debug(size);
						var p = page || 0;
						var s = size || 10;
						
						
						var url = '/api/modeloutput/user/'+userId+'?page='+p+'&size='+s;
						var promise = $http({
							method  : 'POST',
							url		: url,
							data    : JSON.stringify(options),
							headers : { 'Content-Type': 'application/json'}
						})
						.then(function (response) {
							if (response && response.data) {
								return response.data.content;		    	
							}
							$log.debug('No model output');
							return null;
						}, genericHandleError);
						return promise;
					}
				}
			});
angular
.module('OpenDashboard')
.service('RosterService', function($log, $http, OpenDashboard_API) {
  return {
    getRoster: function(tenantId,contextMappingId) {
    		
      var url = '/api/tenants/'+tenantId+'/contexts/'+contextMappingId+'/roster';
      var promise = $http({
    	method  : 'GET',
    	url		: url,
    	headers : { 'Content-Type': 'application/json'}
      })
      .then(
        function (response) {
          if (response && response.data) {
            var members = [];
        	angular.forEach(response.data, function(value,key) {
              var member = OpenDashboard_API.createMemberInstance();
              member.fromService(value);
              members.push(member);
            });
        			
        	return members;		    			
          }
          $log.debug('No members found for getRoster');
          return null;
        },
        function (error) {
          var errorObj = {};
          errorObj['isError'] = true;
          errorObj['errorCode'] = error.data.errors[0];
        	
          return errorObj;
        }
      );
      return promise;
    },
    getRosterBasicLIS: function(tenantId,contextMappingId,id) {
        var url = '/api/tenants/'+tenantId+'/contexts/'+contextMappingId+'/roster/basiclis/'+id;
        var promise = $http({
      	method  : 'GET',
      	url		: url,
      	headers : { 'Content-Type': 'application/json'}
        })
        .then(
          function (response) {
            if (response && response.data) {
              var members = [];
              angular.forEach(response.data, function(value,key) {
                var member = OpenDashboard_API.createMemberInstance();
                member.fromService(value);
                members.push(member);
              });
          			
          	return members;		    			
            }
            $log.debug('No members found for getRoster');
            return null;
          },
          function (error) {
            var errorObj = {};
            errorObj['isError'] = true;
            errorObj['errorCode'] = error.data.errors[0];
          	
            return errorObj;
          }
        );
        return promise;
    }
  }
});
			angular.
			module('OpenDashboard')
			.service('dataService', function ($log) {
		        return {
		            checkUniqueValue: function (dashboards, field, value) {
		                if(value == undefined)
		                    value = "";
		                return ( _.result(_.find(dashboards,field, value), field) === undefined);
		            }
		        }
		     });
})(angular, JSON, Math);
