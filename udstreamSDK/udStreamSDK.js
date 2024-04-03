const Offset = {
  isVisible: 0,
  UUID: 4,
  lastUpdate: 48,
  itemtype: 56,
  itemtypeStr: 60,
  pName: 68,
  pURI: 72,
  hasBoundingBox: 76,
  boundingBox: 80,
  geomtype: 128,
  geomCount: 132,
  pCoordinates: 136,
  pParent: 140,
  pNextSibling: 144,
  pFirstChild: 148,
  pUserData: 156,
}

class ProjectNode {
  projectNodePtr = 0

  constructor(projectNodePtr) {
    this.projectNodePtr = projectNodePtr
  }

  get isVisible() {
    if (this.projectNodePtr == 0) return false
    return window.getValue(this.projectNodePtr + Offset.isVisible, 'i32') == 0 ?
      false :
      true
  }

  set isVisible(isVisible) {
    if (this.projectNodePtr == 0) return
    Module.ccall(
      'udSceneNode_SetVisibility',
      'int',
      ['int', 'int'],
      [this.projectNodePtr, isVisible ? 1 : 0]
    )
  }

  get UUID() {
    if (this.projectNodePtr == 0) return
    return window.UTF8ToString(this.projectNodePtr + Offset.UUID, 37)
  }

  lastUpdate = 0.0

  get itemtype() {
    if (this.projectNodePtr == 0) return
    return window.getValue(this.projectNodePtr + Offset.itemtype, 'i32')
  }

  get itemtypeStr() {
    if (this.projectNodePtr == 0) return null
    return window.UTF8ToString(this.projectNodePtr + Offset.itemtypeStr)
  }

  get name() {
    if (this.projectNodePtr == 0) return null
    return window.UTF8ToString(
      window.getValue(this.projectNodePtr + Offset.pName, 'i32')
    )
  }

  set name(name) {
    if (this.projectNodePtr == 0)
      return;
    Module.ccall('vcJavascriptHooks_SetProjectNodeName', undefined, ['int', 'string'], [this.projectNodePtr, name]);
  }

  get geomtype() {
    if (this.projectNodePtr == 0) return
    return window.getValue(this.projectNodePtr + Offset.geomtype, 'i32')
  }

  parentInternal = null
  get parent() {
    if (this.projectNodePtr != 0) {
      let ptr = window.getValue(this.projectNodePtr + Offset.pParent, 'i32')
      if (
        this.parentInternal == null ||
        this.parentInternal.projectNodePtr != ptr
      ) {
        this.parentInternal = ptr != 0 ? new ProjectNode(ptr) : null
      }
    }
    return this.parentInternal
  }

  nextSiblingInternal = null
  get nextSibling() {
    if (this.projectNodePtr != 0) {
      let ptr = window.getValue(
        this.projectNodePtr + Offset.pNextSibling,
        'i32'
      )
      if (
        this.nextSiblingInternal == null ||
        this.nextSiblingInternal.projectNodePtr != ptr
      ) {
        this.nextSiblingInternal = ptr != 0 ? new ProjectNode(ptr) : null
      }
    }
    return this.nextSiblingInternal
  }

  firstChildInternal = null
  get firstChild() {
    if (this.projectNodePtr != 0) {
      let ptr = window.getValue(this.projectNodePtr + Offset.pFirstChild, 'i32')
      if (
        this.firstChildInternal == null ||
        this.firstChildInternal.projectNodePtr != ptr
      ) {
        this.firstChildInternal = ptr != 0 ? new ProjectNode(ptr) : null
      }
    }
    return this.firstChildInternal
  }

  GetMetadataInt(key, defaultValue) {
    if (this.projectNodePtr == 0) return defaultValue
    let ptr = Module._malloc(4)
    Module.ccall(
      'udSceneNode_GetMetadataInt',
      null,
      ['number', 'string', 'number', 'number'],
      [this.projectNodePtr, key, ptr, defaultValue]
    )
    let val = window.getValue(ptr, 'i32')
    Module._free(ptr)
    return val
  }

  SetMetadataInt(key, value) {
    if (this.projectNodePtr == 0) return
    Module.ccall(
      'udSceneNode_SetMetadataInt',
      null,
      ['number', 'string', 'number'],
      [this.projectNodePtr, key, value]
    )
  }

  GetMetadataUint(key, defaultValue) {
    if (this.projectNodePtr == 0) return defaultValue
    let ptr = Module._malloc(4)
    Module.ccall(
      'udSceneNode_GetMetadataUint',
      null,
      ['number', 'string', 'number', 'number'],
      [this.projectNodePtr, key, ptr, defaultValue]
    )
    let val = window.getValue(ptr, 'i32')
    Module._free(ptr)
    return val
  }

  SetMetadataUint(key, value) {
    if (this.projectNodePtr == 0) return
    Module.ccall(
      'udSceneNode_SetMetadataUint',
      null,
      ['number', 'string', 'number'],
      [this.projectNodePtr, key, value]
    )
  }

  GetMetadataInt64(key, defaultValue) {
    if (this.projectNodePtr == 0) return defaultValue
    let ptr = Module._malloc(8)
    Module.ccall(
      'udSceneNode_GetMetadataInt64',
      null,
      ['number', 'string', 'number', 'number'],
      [this.projectNodePtr, key, ptr, defaultValue]
    )
    let val = window.getValue(ptr, 'i64')
    Module._free(ptr)
    return val
  }

  SetMetadataInt64(key, value) {
    if (this.projectNodePtr == 0) return

    Module.ccall(
      'udSceneNode_SetMetadataInt64',
      null,
      ['number', 'string', 'number'],
      [this.projectNodePtr, key, value]
    )
  }

  GetMetadataDouble(key, defaultValue) {
    if (this.projectNodePtr == 0) return defaultValue

    let ptr = Module._malloc(8)
    Module.ccall(
      'udSceneNode_GetMetadataDouble',
      null,
      ['number', 'string', 'number', 'number'],
      [this.projectNodePtr, key, ptr, defaultValue]
    )
    let val = window.getValue(ptr, 'double')
    Module._free(ptr)
    return val
  }

  SetMetadataDouble(key, value) {
    if (this.projectNodePtr == 0) return
    return Module.ccall(
      'udSceneNode_SetMetadataDouble',
      null,
      ['number', 'string', 'number'],
      [this.projectNodePtr, key, value]
    )
  }

  GetMetadataBool(key, defaultValue) {
    if (this.projectNodePtr == 0) return defaultValue
    let ptr = Module._malloc(1)
    Module.ccall(
      'udSceneNode_GetMetadataBool',
      null,
      ['number', 'string', 'number', 'number'],
      [this.projectNodePtr, key, ptr, defaultValue ? 1 : 0]
    )
    let val = window.getValue(ptr, 'i8')
    Module._free(ptr)
    return val == 1
  }

  SetMetadataBool(key, value) {
    if (this.projectNodePtr == 0) return
    Module.ccall(
      'udSceneNode_SetMetadataBool',
      null,
      ['number', 'string', 'number'],
      [this.projectNodePtr, key, value ? 1 : 0]
    )
  }

  GetMetadataString(key, defaultValue) {
    if (this.projectNodePtr == 0) return defaultValue

    let ptr = Module._malloc(1)
    Module.ccall(
      'udSceneNode_GetMetadataString',
      null,
      ['number', 'string', 'number', 'string'],
      [this.projectNodePtr, key, ptr, defaultValue]
    )
    let val = window.UTF8ToString(window.getValue(ptr, '*'))
    Module._free(ptr)

    return val
  }

  SetMetadataString(key, value) {
    if (this.projectNodePtr == 0) return

    Module.ccall(
      'udSceneNode_SetMetadataString',
      null,
      ['number', 'string', 'string'],
      [this.projectNodePtr, key, value]
    )
  }

  forEachChild(callback) {
    let child = this.firstChild
    while (child != null) {
      callback(child)
      child = child.nextSibling
    }
  }

  * children() {
    let child = this.firstChild
    while (child != null) {
      yield child
      child = child.nextSibling
    }
    return null
  }

  checkUpdates() {
    this.lastUpdate = window.getValue(
      this.projectNodePtr + Offset.lastUpdate,
      'double'
    )
    this.forEachChild((child) => child.checkUpdates())
  }

  FetchNodeGeometryAsCartesian() {
    return new Promise((resolve) => {
      let callback = (geometry) => {
        Module.removeFunction(callbackPtr)
        resolve(JSON.parse(window.UTF8ToString(geometry)))
      }
      let callbackPtr = Module.addFunction(callback, 'vi')
      Module.ccall(
        'vcJavascriptHooks_FetchNodeGeometryAsCartesian',
        null,
        ['number', 'number'],
        [callbackPtr, this.projectNodePtr]
      )
    })
  }

  UpdateNodeGeometryFromCartesian(points, newType = -1) {
    Module.ccall(
      'vcJavascriptHooks_UpdateNodeGeometryFromCartesian',
      null,
      ['number', 'string', 'number'],
      [this.projectNodePtr, JSON.stringify(points), newType]
    )
  }
}

function getNodesRecursive(node) {
  let nodes = []
  node.forEachChild((child) => {
    nodes.push({
      node: child,
      children: getNodesRecursive(child),
    })
  })
  return nodes.length > 0 ? nodes : undefined
}

let mapTiles = [];

function fillMapTiles(pJSON) {
  let mapTilesProvidersStrJSON = window.UTF8ToString(pJSON);
  mapTiles = JSON.parse(mapTilesProvidersStrJSON);
}

let pinIcons = [];

function fillPinIcons(pJSON) {
  let pinIconsJSON = window.UTF8ToString(pJSON);
  pinIcons = JSON.parse(pinIconsJSON).pinIcons;
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    var script = document.createElement('script')

    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', './udstreamSDK/udStream.js')
    document.getElementsByTagName('head')[0].appendChild(script)

    let canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    document.body.appendChild(canvas)

    let container = document.createElement('div')
    container.classList.add('ud-container')
    let innerHtml = `<div id="statusLoading" class="ud-statusBox">
<div class="ud-loader"></div>
<br />
<span>模型加载中...</span>
</div>
<div id="statusFailureUnsupported" class="ud-statusBox" hidden>
<img src="./udstreamSDK/error-icon.svg" style="width: 250px" />
<h4>
  udStream uses advanced features not compatible with your browser.
  Please try the following:
</h4>
<ol class="ud-ol">
  <li>
    Use the latest
    <a href="https://www.google.com.au/chrome">Chrome</a>,
    <a href="https://www.microsoft.com/edge">Edge</a> or
    <a href="https://www.opera.com/download">Opera</a> browsers
  </li>
  <li>
    Consider using
    <a href="https://udcloud.euclideon.com/#software"
      >udStream for Desktop</a
    >
  </li>
  <li>
    Contact us at
    <a href="mailto:support@euclideon.com">support@euclideon.com</a>
  </li>
</ol>
</div>
<div id="statusFailureRuntime" class="ud-statusBox" hidden>
<img src="./udstreamSDK/error-icon.svg" style="width: 250px" />
<h4>
  udStream has encountered a runtime error.<br />Please try the
  following:
</h4>
<ol class="ud-ol">
  <li>
    <a href="javascript:window.location.reload(true)">Reload</a> this
    page and try again
  </li>
  <li>
    Use the latest
    <a href="https://www.google.com.au/chrome">Chrome</a>,
    <a href="https://www.microsoft.com/edge">Edge</a> or
    <a href="https://www.opera.com/download">Opera</a> browsers
  </li>
  <li>
    Consider using
    <a href="https://udcloud.euclideon.com/#software"
      >udStream for Desktop</a
    >
  </li>
  <li>
    Contact us at
    <a href="mailto:support@euclideon.com">support@euclideon.com</a>
  </li>
</ol>
 </div>`
    container.innerHTML = innerHtml
    document.body.appendChild(container)
    window.udStream = {
      load: function (callback) {
        udStream.callback = callback
      },
      createMapTileNode: function (mode, addr, attribution, customAddr, customAttr, height, blendMode, transparency, maxDepth) {
        Module.ccall('vcJavascriptHooks_CreateMapTileNode', undefined, ['string', 'string', 'string', 'string', 'string', 'number', 'number', 'number', 'number'], [mode, addr, attribution, customAddr, customAttr, height, blendMode, transparency, maxDepth]);
      },
      SupportsWebGL2: function () {
        var hasSupport = false
        var canvas = document.createElement('canvas')
        try {
          var ctx = canvas.getContext('webgl2')
          hasSupport = ctx != null
        } catch (e) { }
        return hasSupport
      },

      Loginv1: function (email, password, callback) {
        let callbackPtr = 0
        if (callback) callbackPtr = Module.addFunction(callback, 'vi')
        Module.ccall(
          'vcJavascriptHooks_Loginv1',
          undefined,
          ['string', 'string', 'int'],
          [email, password, callbackPtr]
        )
      },

      Loginv2: function (callback) {
        let callbackPtr = 0
        if (callback) callbackPtr = Module.addFunction(callback, 'vi')

        Module.ccall(
          'vcJavascriptHooks_Loginv2',
          undefined,
          ['int'],
          [callbackPtr]
        )
      },

      CancelLogin: function () {
        Module.ccall('vcJavascriptHooks_CancelLogin', undefined, [], [])
      },

      Logout: function () {
        Module.ccall('vcJavascriptHooks_Logout', undefined, [], [])
      },

      createProject: function (callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(function (projectPtr) {
            callback(projectPtr)
            Module.removeFunction(callbackPtr)
          }, 'vi')
        }
        Module.ccall(
          'vcJavascriptHooks_CreateProject',
          null,
          ['int'],
          [callbackPtr]
        )
      },
      loadUds: function (url, callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(function () {
            setTimeout(() => {
              callback()
            }, 2000)
            Module.removeFunction(callbackPtr)
          }, 'v')
        }
        Module.ccall(
          'vcJavascriptHooks_LoadFile',
          null,
          ['string', 'int'],
          [url, callbackPtr]
        )
      },

      loadSceneItem: function (uri) {
        return new Promise((resolve) => {
          let callback = (result) => {
            Module.removeFunction(callbackPtr);
            resolve(result);
          };
          let callbackPtr = globalThis.Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_LoadSceneItem', undefined, ['string', 'int'], [uri, callbackPtr]);
        });
      },

      mergeScenes: function (pathURL) {
        Module.ccall('vcJavascriptHooks_MergeScenes', undefined, ['string'], [pathURL]);
      },

      moveTo: function (x, y, z, speed, callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(function () {
            callback()
            Module.removeFunction(callbackPtr)
          }, 'v')
        }
        Module.ccall(
          'vcJavascriptHooks_MoveTo',
          null,
          ['number', 'number', 'number', 'number', 'int'],
          [x, y, z, speed, callbackPtr]
        )
      },

      addPoint(x, y, z, name) {
        return new Promise((resolve) => {
          let callback = (nodePtr) => {
            resolve(nodePtr);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_AddPoint', undefined, ['number', 'number', 'number', 'string', 'int'], [x, y, z, name, callbackPtr]);
        })
      },

      addPoints(data) {
        return new Promise((resolve) => {
          let callback = (nodePtr) => {
            resolve(nodePtr);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_AddPoints', undefined, ['string', 'int'], [JSON.stringify(data), callbackPtr]);
        })
      },

      addPolyline(data) {
        return new Promise((resolve) => {
          let callback = (nodePtr) => {
            resolve(nodePtr);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_AddPolyline', undefined, ['string', 'int'], [JSON.stringify(data), callbackPtr]);
        })
      },

      addPolygon(data) {
        return new Promise((resolve) => {
          let callback = (nodePtr) => {
            resolve(nodePtr);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_AddPolygon', undefined, ['string', 'int'], [JSON.stringify(data), callbackPtr]);
        })
      },

      registerMouse3DPosCallback: function (callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(function (x, y, z) {
            callback(x, y, z)
          }, 'vddd')
        }
        Module.ccall(
          'vcJavascriptHooks_SetMouse3DPosCallback',
          null,
          ['int'],
          [callbackPtr]
        )
      },
      setNodeVisibility: function (uuid, visibility, callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(function (visibility) {
            callback(visibility != 0)
          }, 'vi')
        }
        Module.ccall(
          'vcJavascriptHooks_SetNodeVisibility',
          null,
          ['string', 'int', 'int'],
          [uuid, visibility ? 1 : 0, callbackPtr]
        )
      },
      toggleNodeVisibility: function (uuid, callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(function (visibility) {
            callback(visibility != 0)
          }, 'vi')
        }
        Module.ccall(
          'vcJavascriptHooks_ToggleNodeVisibility',
          null,
          ['string', 'int'],
          [uuid, callbackPtr]
        )
      },
      setProjectSettings: function (data, callback) {
        var callbackPtr = 0
        if (callback) {
          callbackPtr = Module.addFunction(callback, 'v')
        }
        Module.ccall(
          'vcJavascriptHooks_SetProjectSettings',
          undefined,
          ['string', 'int'],
          [JSON.stringify(data), callbackPtr]
        )
      },
      loadProjectServer: function (projectID, groupID) {
        Module.ccall(
          'vcJavascriptHooks_LoadProjectServer',
          undefined,
          ['string', 'string'],
          [projectID, groupID]
        )
      },

      loadProjectSharecode: function (sharecode) {
        Module.ccall(
          'vcJavascriptHooks_LoadProjectSharecode',
          undefined,
          ['string'],
          [sharecode]
        )
      },

      selectServer: function (url) {
        Module.ccall(
          'vcJavascriptHooks_SelectServer',
          undefined,
          ['string'],
          [url]
        )
      },

      addMedia: function (url) {
        Module.ccall('vcJavascriptHooks_AddMedia', undefined, ['string'], [url])
      },
      getProjectNode: function (callback) {
        udStream.ProjectNodes = getNodesRecursive(udStream.RootNode)
        // Module.ccall(
        //   'vcJavascriptHooks_RegisterGetActiveProjectRootNodeCallback',
        //   undefined,
        //   ['number'],
        //   [
        //     Module.addFunction((rootNodePtr) => {
        //       euclideon.RootNode = new ProjectNode(rootNodePtr)
        //       euclideon.ProjectNodes = getNodesRecursive(euclideon.RootNode)
        //       callback(euclideon.RootNode, euclideon.ProjectNodes)
        //     }, 'vi'),
        //   ]
        // )
      },

      removeProjectNode: function (projectNodePtr) {
        Module.ccall(
          'vcJavascriptHooks_RemoveProjectNode',
          undefined,
          ['int'],
          [projectNodePtr]
        )
      },

      moveToWhenPossible: function (uuid) {
        Module.ccall(
          'vcJavascriptHooks_MoveToWhenPossible',
          undefined,
          ['string'],
          [uuid]
        )
      },

      tweenToPickLocation: function () {
        Module.ccall(
          'vcJavascriptHooks_TweenToPickLocation',
          undefined,
          ['string'],
          []
        )
      },

      setActiveTool: function (tool, clearSelection = true) {
        Module.ccall(
          'vcJavascriptHooks_SetActiveTool',
          undefined,
          ['int', 'int'],
          [tool, clearSelection ? 1 : 0]
        )
      },

      setGizmoTool(node, tool) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_SetGizmoTool', undefined, ['int', 'int', 'int'], [callbackPtr, node.projectNodePtr, tool]);
        });
      },

      getAllowedGizmoControls(node) {
        return new Promise((resolve) => {
          let callback = (allowedControls) => {
            Module.removeFunction(callbackPtr);
            resolve(allowedControls);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetAllowedGizmoControls', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      toggleGizmoTools(node, enabled) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_ToggleGizmoTools', undefined, ['int', 'int', 'int'], [callbackPtr, node.projectNodePtr, enabled ? 1 : 0]);
        });
      },

      changeLanguage: function (languageCode) {
        Module.ccall(
          'vcJavascriptHooks_ChangeLanguage',
          undefined,
          ['string'],
          [languageCode]
        )
      },

      getCameraInfo: function () {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr)
            resolve(JSON.parse(window.UTF8ToString(dataPtr)))
          }
          let callbackPtr = Module.addFunction(callback, 'vi')
          Module.ccall(
            'vcJavascriptHooks_GetCameraInfo',
            undefined,
            ['int'],
            [callbackPtr]
          )
        })
      },

      getSettings: function () {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr)
            resolve(JSON.parse(window.UTF8ToString(dataPtr)))
          }
          let callbackPtr = Module.addFunction(callback, 'vi')
          Module.ccall(
            'vcJavascriptHooks_GetSettings',
            undefined,
            ['int'],
            [callbackPtr]
          )
        })
      },

      GetMapTileProviders: async function () {
        return new Promise((resolve) => {
          let callback = (pJSON) => {
            Module.removeFunction(callbackPtr);
            fillMapTiles(pJSON);
            resolve(mapTiles);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetMapTilesProviders', undefined, ['int'], [callbackPtr]);
        })
      },

      getKeyNames() {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr);
            resolve(JSON.parse(window.UTF8ToString(dataPtr)));
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetKeyNames', undefined, ['int'], [callbackPtr]);
        });
      },

      getBindingKeyString(e) {
        if (e.key === 'Shift' || e.key === 'Ctrl' || e.key === 'Alt')
          return;

        let key = e.key;
        if (key?.length === 1)
          key = key.toUpperCase();

        let modifiers = '';
        if (e.shiftKey)
          modifiers += 'Shift + ';
        else if (e.ctrlKey)
          modifiers += 'Ctrl + ';
        else if (e.altKey)
          modifiers += 'Alt + ';

        return modifiers + key;
      },

      getGeozoneInfo: function () {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr)
            resolve(JSON.parse(window.UTF8ToString(dataPtr)))
          }
          let callbackPtr = Module.addFunction(callback, 'vi')
          Module.ccall(
            'vcJavascriptHooks_GetGeozoneInfo',
            undefined,
            ['int'],
            [callbackPtr]
          )
        })
      },

      registerGetSessionInfoCallback: function () {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr)
            resolve(JSON.parse(window.UTF8ToString(dataPtr)))
          }
          let callbackPtr = Module.addFunction(callback, 'vi')
          Module.ccall(
            'vcJavascriptHooks_RegisterGetSessionInfoCallback',
            undefined,
            ['int'],
            [callbackPtr]
          )
        })
      },

      saveSettings: function (data) {
        return new Promise((resolve) => {
          let callback = (success) => {
            Module.removeFunction(callbackPtr)
            resolve(success != 0)
          }
          let callbackPtr = Module.addFunction(callback, 'vi')
          Module.ccall(
            'vcJavascriptHooks_SaveSettings',
            undefined,
            ['string', 'int'],
            [JSON.stringify(data), callbackPtr]
          )
        })
      },

      takeScreenshot: function () {
        Module.ccall('vcJavascriptHooks_TakeScreenshot', undefined, [], [])
      },

      restore3DTrackingDefault: function () {
        Module.ccall('vcJavascriptHooks_Restore3DTrackingDefault', undefined, [], [])
      },

      setCameraMoveSpeed: function (moveSpeed) {
        Module.ccall(
          'vcJavascriptHooks_SetCameraMoveSpeed',
          undefined,
          ['string'],
          [JSON.stringify(moveSpeed)]
        )
      },

      setCameraRotation: function (rotation) {
        Module.ccall(
          'vcJavascriptHooks_SetCameraRotation',
          undefined,
          ['number', 'number'],
          [rotation.heading, rotation.pitch]
        )
      },

      setCameraPosition: function (position) {
        Module.ccall(
          'vcJavascriptHooks_SetCameraPosition',
          undefined,
          ['number', 'number', 'number'],
          [position.x, position.y, position.z]
        )
      },

      setCameraPositionGIS: function (positionGIS) {
        Module.ccall(
          'vcJavascriptHooks_SetCameraPositionGIS',
          undefined,
          ['number', 'number', 'number'],
          [positionGIS.lat, positionGIS.lon, positionGIS.alt]
        )
      },

      createBlankScene(name, srid) {
        return new Promise((resolve) => {
          let callback = (success) => {
            Module.removeFunction(callbackPtr);
            resolve(success != 0);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_CreateBlankScene', undefined, ['string', 'number', 'number'], [name, srid, callbackPtr]);
        });
      },

      setColorByHeightScheme(json) {
        Module.ccall(
          "vcJavascriptHooks_SetColorByHeightScheme",
          undefined,
          ["string"],
          [JSON.stringify(json)]
        )
      },

      resetUDSPick() {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_ResetScreenCompareUDSPick', undefined, ['int'], [callbackPtr]);
        });
      },

      updateMovementVector(x, y, z) {
        Module.ccall('vcJavascriptHooks_UpdateMovementVector', undefined, ['number', 'number', 'number'], [x, y, z]);
      },

      registerGetClickedItemCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGetClickedItemCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((uuidPtr) => {
              callback(window.UTF8ToString(uuidPtr))
            }, 'vii'),
          ]
        )
      },

      registerGetCameraInfoCallback(callback) {
        callbackPtr = Module.addFunction((dataPtr) => {
          if (callback) callback(window.UTF8ToString(dataPtr))
        }, 'vi');
        Module.ccall('vcJavascriptHooks_RegisterGetCameraInfoCallback', undefined, ['number'], [callbackPtr]);
      },

      getFirstSelectedNode() {
        return new Promise((resolve) => {
          let callback = (nodePtr) => {
            Module.removeFunction(callbackPtr);
            resolve(nodePtr);
          };
          let callbackPtr = Module.addFunction(callback, "vi");
          Module.ccall("vcJavascriptHooks_GetFirstSelectedNode", undefined, ["int",], [callbackPtr]);
        });
      },

      selectSceneNodes(nodePtrArr, clearSelected) {
        Module.ccall('vcJavascriptHooks_SelectSceneNodes', undefined, ['string', 'int'], [JSON.stringify(nodePtrArr), clearSelected ? 1 : 0]);
      },

      clearSelection() {
        Module.ccall('vcJavascriptHooks_ClearSelection', undefined, [], []);
      },

      setNodeSelected(uuid) {
        Module.ccall('vcJavascriptHooks_SetNodeSelected', undefined, ['string'], [uuid]);
      },

      addProjectNode(type, defaultName, errorSrc) {
        Module.ccall('vcJavascriptHooks_AddProjectNode', undefined, ['string', 'string', 'string'], [type, defaultName, errorSrc]);
      },

      startRecordFlyThrough(node) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'v');
          Module.ccall('vcJavascriptHooks_StartRecordFlyThrough', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      stopRecordFlyThrough(node) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'v');
          Module.ccall('vcJavascriptHooks_StopRecordFlyThrough', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      playFlyThroughRecording(node, timePosition) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'v');
          Module.ccall('vcJavascriptHooks_PlayFlyThroughRecording', undefined, ['int', 'int', 'number'], [callbackPtr, node.projectNodePtr, timePosition]);
        });
      },

      stopPlayFlyThrough(node) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'v');
          Module.ccall('vcJavascriptHooks_StopPlayFlyThrough', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      getFlyThroughInfo(node) {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr);
            resolve(JSON.parse(UTF8ToString(dataPtr)));
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetFlyThroughInfo', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      registerGetTimePositionCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGetPlaybackTimePositionCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((uuidPtr) => {
              callback(uuidPtr)
            }, 'vf'),
          ]
        )
      },

      getDiagnosticInfo() {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr);
            resolve(JSON.parse(UTF8ToString(dataPtr)));
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetDiagnosticInfo', undefined, ['int'], [callbackPtr]);
        });
      },

      getVoxelAttributes() {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr);
            resolve(JSON.parse(UTF8ToString(dataPtr)));
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetVoxelAttributes', undefined, ['int'], [callbackPtr]);
        });
      },

      getUDSModelMetadata(node) {
        return new Promise((resolve) => {
          let callback = (dataPtr) => {
            Module.removeFunction(callbackPtr);
            resolve(dataPtr != 0 ? JSON.parse(UTF8ToString(dataPtr)) : undefined);
          };
          let callbackPtr = Module.addFunction(callback, 'vi');
          Module.ccall('vcJavascriptHooks_GetUDSModelMetadata', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      registerGetScreenshotDataCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGetScreenshotDataCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((dataPtr) => {
              callback(window.UTF8ToString(dataPtr))
            }, 'vi'),
          ]
        )
      },

      GetPinIcons() {
        if (pinIcons.length != 0) {
          return pinIcons;
        } else {
          return new Promise((resolve) => {
            let callback = (pJSON) => {
              Module.removeFunction(callbackPtr);
              fillPinIcons(pJSON);
              resolve(pinIcons);
            };
            let callbackPtr = Module.addFunction(callback, 'vi');
            Module.ccall('vcJavascriptHooks_GetPinIconList', undefined, ['int'], [callbackPtr]);
          });
        }
      },

      registerGeneralUDSPickCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGeneralUDSPickCallback',
          undefined,
          ['int'],
          [
            Module.addFunction((modelPtr, x, y, z) => {
              callback(modelPtr, x, y, z)
            }, 'vifff'),
          ]
        )
      },

      advancedMeasurement(points, nodePtr, pMask) {
        return new Promise((resolve) => {
          let callback = (nodePtr, lineDistance, horizontalDistance, verticalDistance) => {
            Module.removeFunction(callbackPtr);
            resolve([nodePtr, lineDistance, horizontalDistance, verticalDistance]);
          };
          let callbackPtr = Module.addFunction(callback, 'vifff');
          Module.ccall('vcJavascriptHooks_AdvancedMeasurement', undefined, ['number', 'number', 'number', 'number', 'string', 'int'], [points[0], points[1], points[2], nodePtr, pMask, callbackPtr]);
        })
      },

      sagMeasurement(nodePtr, pt0, pt1, masks) {
        return new Promise((resolve) => {
          let callback = (distance) => {
            Module.removeFunction(callbackPtr);
            resolve(distance);
          };
          let callbackPtr = Module.addFunction(callback, "vf");
          Module.ccall("vcJavascriptHooks_SagMeasurement", undefined, ["number", "number", "number", "number", "number", "number", "number", "string", "int",], [nodePtr, pt0[0], pt0[1], pt0[2], pt1[0], pt1[1], pt1[2], masks, callbackPtr]);
        });
      },

      getNearestUds(point) {
        return new Promise((resolve) => {
          let callback = (nodePtr) => {
            Module.removeFunction(callbackPtr);
            resolve(nodePtr);
          };
          let callbackPtr = Module.addFunction(callback, "vi");
          Module.ccall("vcJavascriptHooks_GetNearestUds", undefined, ["number", "number", "number", "int",], [point[0], point[1], point[2], callbackPtr]);
        });
      },

      setNodesToGetScreenCoords(uuids) {
        Module.ccall('vcJavascriptHooks_SetNodesToGetScreenCoords', undefined, ['string'], [JSON.stringify(uuids)]);
      },

      registerGetScreenCoordCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGetScreenCoordCallback',
          undefined,
          ['int'],
          [
            Module.addFunction((modelPtr, x, y, z) => {
              callback(modelPtr, x, y, z)
            }, 'vifff'),
          ]
        )
      },

      visibleTest(nodePtr, pt0, pt1) {
        return new Promise((resolve) => {
          let callback = (visible, dist) => {
            Module.removeFunction(callbackPtr);
            resolve([visible, dist]);
          };
          let callbackPtr = Module.addFunction(callback, "vif");
          Module.ccall("vcJavaScriptHooks_VisibleTest", undefined, ["number", "number", "number", "number", "number", "number", "number", "int"], [nodePtr, pt0[0], pt0[1], pt0[2], pt1[0], pt1[1], pt1[2], callbackPtr,]);
        });
      },

      registerGetGeozoneInfoCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGetGeozoneInfoCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((srid, geozoneNamePtr) => {
              callback({
                srid: srid,
                name: window.UTF8ToString(geozoneNamePtr)
              })
            }, 'vii'),
          ]
        )
      },

      registerGetDiagnosticInfoCallback(callback) {
        Module.ccall(
          'vcJavascriptHooks_RegisterGetDiagnosticInfoCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((dataPtr) => {
              callback(dataPtr != 0 ? JSON.parse(window.UTF8ToString(dataPtr)) : undefined)
            }, 'vi'),
          ]
        )
      },

      performFlythrough(node) {
        return new Promise((resolve) => {
          let callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          let callbackPtr = Module.addFunction(callback, 'v');
          Module.ccall('vcJavascriptHooks_PerformFlythrough', undefined, ['int', 'int'], [callbackPtr, node.projectNodePtr]);
        });
      },

      detachCamera() {
        return new Promise((resolve) => {
          const callback = () => {
            Module.removeFunction(callbackPtr);
            resolve();
          };
          const callbackPtr = Module.addFunction(callback, 'v');
          Module.ccall('vcJavascriptHooks_DetachCamera', undefined, ['int'], [callbackPtr]);
        });
      }
    }
    var supportsWebGL2 = window.udStream.SupportsWebGL2()

    if (!supportsWebGL2) {
      document.getElementById('canvas').hidden = true
      document.getElementById('statusLoading').hidden = true
      document.getElementById('statusFailureUnsupported').hidden = false
    }

    window.onerror = function (event) {
      document.getElementById('canvas').hidden = true
      document.getElementById('statusLoading').hidden = true
      document.getElementById('statusFailureUnsupported').hidden =
        supportsWebGL2

      if (Module) {
        Module.setStatus('Exception thrown, see JavaScript console')
        Module.setStatus = function (text) {
          if (text) {
            console.error('[post-exception status] ' + text)
            document.getElementById('statusFailureUnsupported').hidden = true
            document.getElementById('statusFailureRuntime').hidden = false
          }
        }
      } else {
        console.log('Failure! ' + text)
      }
    }

    window.oncontextmenu = function (e) {
      e.preventDefault()
    }

    window.onkeydown = function (e) {
      if (
        e.keyCode === 9 || // tab
        e.keyCode === 114 || // F3
        e.keyCode === 117 || // F6
        e.keyCode === 121 // F10
      ) {
        e.preventDefault()
      }
    }
    // Disable trackpad pinch-to-zoom functionality
    document.getElementById('canvas').addEventListener('wheel', function (e) {
      e.preventDefault()
    })

    var searchParams = new URLSearchParams(window.location.search)
    var arg = searchParams.get('f')

    window.Module = {
      arguments: arg !== null ? ['--domain', arg] : ['--domain'], // arguments: arg !== null ? [arg] : null,   // arg !== null ? ['--domain', arg] : ['--domain'],
      canvas: document.getElementById('canvas'),
      noInitialRun: !supportsWebGL2,
      mainScriptUrlOrBlob: 'udStream.js',
      preRun: [
        function () {
          FS.mkdir('/libsdl')
          FS.mount(IDBFS, {}, '/libsdl')
        },
      ],
      setStatus: function (text) {
        if (!Module.setStatus.last) Module.setStatus.last = {
          text: ''
        }
        if (text === Module.setStatus.last.text) return
        var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/)
        Module.setStatus.last.text = text
        if (m) {
          text = m[1]
        }
        // console.log(Module.setStatus.last.text)
      },
      onRegisterUICallbacks: function () {
        /*-----------去掉欢迎页-------------- */
        let callbackPtr = Module.addFunction(() => {
          return 1
        }, 'ii')
        Module.ccall(
          'vcJavascriptHooks_RegisterModalOpenCallback',
          undefined,
          ['number'],
          [callbackPtr]
        )

        /* ----------------------------------- */
        let getFeaturedProjectsCallback = (projectsJSON, key) => {
          udStream.projectsJSON = JSON.parse(projectsJSON)
          udStream.key = key
        }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetFeaturedProjectsCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((projectJSONPtr, keyPtr) => {
              getFeaturedProjectsCallback(
                window.UTF8ToString(projectJSONPtr),
                window.UTF8ToString(keyPtr)
              )
            }, 'vii'),
          ]
        )

        /* ----------------------------------- */
        let getProjectInfoBaseCallback = (name, markdown) => {
          udStream.name = name
          udStream.markdown = markdown
        }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetProjectInfoCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((namePtr, markdownPtr) => {
              getProjectInfoBaseCallback(
                window.UTF8ToString(namePtr),
                window.UTF8ToString(markdownPtr)
              )
            }, 'vii'),
          ]
        )

        /*-------------获取session------------ */
        let getSessionInfoCallback = (sessionInfo) => {
          udStream.SessionInfo = JSON.parse(sessionInfo)
        }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetSessionInfoCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((dataPtr) => {
              getSessionInfoCallback(
                dataPtr != 0 ? window.UTF8ToString(dataPtr) : null
              )
            }, 'vi'),
          ]
        )

        /* ----------------------------------- */
        let getProcessingItemsCountCallback = (itemsCount) => {
          udStream.itemsCount = itemsCount
        }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetProcessingItemsCountCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((itemsCount) => {
              getProcessingItemsCountCallback(itemsCount)
            }, 'vi'),
          ]
        )

        /*-------------注册获取根节点----------- */
        let getActiveProjectRootNodeCallback = (rootNodePtr) => {
          udStream.RootNode = new ProjectNode(rootNodePtr)
          udStream.ProjectNodes = getNodesRecursive(udStream.RootNode)

        }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetActiveProjectRootNodeCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((rootNodePtr) => {
              getActiveProjectRootNodeCallback(rootNodePtr)
            }, 'vi'),
          ]
        )

        /*------------------------- */
        let getUpdateProjectNodesCallback = () => {
          if (udStream.RootNode) {
            udStream.RootNode.checkUpdates()
          }
        }
        Module.ccall(
          'vcJavascriptHooks_RegisterUpdateProjectNodesCallback',
          undefined,
          ['number'],
          [
            Module.addFunction(() => {
              getUpdateProjectNodesCallback()
            }, 'v'),
          ]
        )

        /*------------------------- */
        let getScreenshotDataCallback = (data) => { }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetScreenshotDataCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((dataPtr) => {
              getScreenshotDataCallback(window.UTF8ToString(dataPtr))
            }, 'vi'),
          ]
        )

        /*------------------------- */
        let getClickedItemCallback = (uuid) => {
          if (udStream.ProjectNodes) {
            let idx = udStream.ProjectNodes.findIndex(
              (item) => item.node.UUID === uuid
            )
            udStream.ActiveNodes = udStream.ProjectNodes[idx]
          }
        }
        Module.ccall(
          'vcJavascriptHooks_RegisterGetClickedItemCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((uuidPtr) => {
              getClickedItemCallback(window.UTF8ToString(uuidPtr))
            }, 'vii'),
          ]
        )

        /*------------------------- */
        let setActiveToolCallback = (activeTool) => { }
        Module.ccall(
          'vcJavascriptHooks_RegisterSetActiveToolCallback',
          undefined,
          ['number'],
          [
            Module.addFunction((activeTool) => {
              setActiveToolCallback(window.UTF8ToString(activeTool))
            }, 'vi'),
          ]
        )

        setTimeout(() => {
          udStream.callback(udStream)
        }, 2000)
      },
      onMainLoopStart: function () {
        document.getElementById('statusLoading').hidden = true
        document.querySelector('.ud-container').style.display = 'none'
      },
    }
  },
  false
)