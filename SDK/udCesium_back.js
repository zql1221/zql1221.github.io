/**  用来加载uds模型的插件 */
class udCesium {
  constructor(viewer) {
    this.udSDKjs = 0 //udSDKjs脚本初始化的状态
    this.easyudSDKjs = 0 //easyudSDKjs脚本初始化的状态
    this.udSDKReady = 0 //uds模型初始化的状态
    this.viewer = viewer
    this._initJS() //内部的私有函数
  }

  /** 初始化脚本 */
  _initJS() {
    let _self = this
    if (document) {
      const udSDKjs = document.createElement('script')
      // udSDKjs.defer=true;
      udSDKjs.onload = function () {
        // console.log("udSDKjs 加载完成")
        _self.udSDKjs = 1
      }
      udSDKjs.src = './SDK/udSDKjs.js'
      document.body.appendChild(udSDKjs)
      const easyudSDKjs = document.createElement('script')
      easyudSDKjs.onload = function () {
        console.log('easyudSDKjs 加载完成')
        _self.easyudSDKjs = 1
      }
      easyudSDKjs.src = './SDK/easyudSDKjs.js'
      document.body.appendChild(easyudSDKjs)
    } else {
      throw new Error('请在浏览器环境下执行！')
    }
  }

  /** 判断域名是否有加载uds的权限有就不用登录了 */
  authority() {
    let _self = this
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    /** 内部函数 */
    async function _udSDKPluginInit() {
      console.log('开始验证权限！')
      await sleep(1000) //用了其它的很多方式
      if (_self.udSDKjs != 1 && _self.easyudSDKjs != 1) {
        throw new Error('脚本未初始化完成！')
      }

      udSDKJS_RegisterShared()
      udSDKJS_SetServerAddress('https://udstream.eulee.cn')
      _self.udSDKReady = 1
      let status = udSDKJS_Domain('CesiumJS')
      return new Promise((resolve, reject) => {
        if (status == 0) {
          _self.udSDKReady = 2
          resolve(status)
        } else {
          resolve(500)
        }
      }).catch((err) => {
        reject(err)
      })
    }
    var Module = {
      noExitRuntime: true,
      preRun: [],
      postRun: _udSDKPluginInit,
      setStatus: function (text) {
        if (!Module.setStatus.last)
          Module.setStatus.last = { time: Date.now(), text: '' }

        if (text === Module.setStatus.last.text) return

        var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/)
        var now = Date.now()
        if (m && now - Module.setStatus.last.time < 30) return // if this is a progress update, skip it if too soon

        Module.setStatus.last.time = now
        Module.setStatus.last.text = text
        if (m) {
          text = m[1]
        }
      },
      totalDependencies: 0,
      monitorRunDependencies: function (left) {
        this.totalDependencies = Math.max(this.totalDependencies, left)
        Module.setStatus(
          left
            ? 'Preparing....----... (' +
                (this.totalDependencies - left) +
                '/' +
                this.totalDependencies +
                ')'
            : 'All downloads complete.'
        )
      },
    }
    return Module.postRun()
  }

  /** 登录相关的方法 */
  login(usrName, usrPwd) {
    let _self = this
    if (usrName && usrPwd) {
      if (_self.udSDKReady != 1) {
        throw new Error('Not ready to login!')
      }
      return new Promise((resolve, reject) => {
        udSDKJS_SetServerAddress('https://udstream.eulee.cn')
        let status = udSDKJS_Login(usrName, usrPwd, 'Cesium')
        if (status == 0) {
          _self.udSDKReady = 2
          resolve(status)
        } else {
          if (status == 13) {
            reject('udSDKJS Error / Username & Password Wrong')
          } else {
            reject('udSDKJS FAILED Error=' + status)
          }
        }
      })
    } else {
      throw new Error('登录用户名与密码不能为空！')
    }
  }

  /**  加载模型  */
  loadUds(udsModel, cameraPosition) {
    if (Cesium) {
      if (!Cesium.__proto__.udsModel) {
        console.log('loadUds......')
        Cesium.__proto__.udsModel = 'udsModel'
        let csPrimitiveInstance = new EuleeVtxfPrimitive(this.viewer)
        csPrimitiveInstance.updateStatus(2)
        this.viewer.scene.primitives.add(csPrimitiveInstance)
        loadUDSModel(udsModel)
        _flyCamera(this.viewer, cameraPosition)
      } else {
        //已经扩展自定义的primitive了
        loadUDSModel(udsModel)
        _flyCamera(this.viewer, cameraPosition)
      }
    } else {
      throw new Error('未引入Cesium对象！')
    }
  }

  /** 批量加载模型   加载模型列表 */
  async loadUdsList(list, cameraPosition) {
    if (Cesium) {
      if (!Cesium.__proto__.udsModel) {
        Cesium.__proto__.udsModel = 'udsModel'
        let csPrimitiveInstance = new EuleeVtxfPrimitive(this.viewer)
        csPrimitiveInstance.updateStatus(2)
        this.viewer.scene.primitives.add(csPrimitiveInstance)
        for (let i = 0; i < list.length; i++) {
          await loadUDSModel(list[i])
        }
        _flyCamera(this.viewer, cameraPosition)
      } else {
        //已经扩展自定义的primitive了
        for (let i = 0; i < list.length; i++) {
          await loadUDSModel(list[i])
        }
        _flyCamera(this.viewer, cameraPosition)
      }
    } else {
      throw new Error('未引入Cesium对象！')
    }
  }

  /**  切换模型  从当前模型切换到另外一个模型 */
  changeUds(udsModel, cameraPosition) {
    udSDKJS_RenderQueueClear(0) //先清除掉
    this.loadUds(udsModel, cameraPosition)
  }

  /** 切换模型列表   从一个模型列表  切换成另外一个模型列表 */
  async changeUdsList(udsModelList, cameraPosition) {
    if (udsModelList.length > 0) {
      udSDKJS_RenderQueueClear(0) //先清除掉
      for (let i = 0; i < udsModelList.length; i++) {
        await loadUDSModel(udsModelList[i])
      }
      _flyCamera(this.viewer, cameraPosition)
    }
  }

  /** 清除到模型 */
  clearUds() {
    udSDKJS_RenderQueueClear(0) //先清除掉
  }
}

class EuleeVtxfPrimitive {
  constructor(viewer) {
    let positions = new Float64Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1])
    let sts = new Float64Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1])
    let previousWidth = 16
    let previousHeight = 16
    this.viewer = viewer
    let context = viewer.scene.context
    this.colourTextureGL = new Cesium.Texture({
      context: context,
      pixelFormat: Cesium.PixelFormat.RGBA,
      width: previousWidth,
      height: previousHeight,
    })

    this.udSDKReady = 0
    this.udTextureDepth = new Cesium.Texture({
      context: context,
      pixelFormat: Cesium.PixelFormat.ALPHA,
      width: previousWidth,
      height: previousHeight,
    })

    let attributeLocations = {
      position: 0,
      textureCoordinates: 1,
    }

    let vtxfVertexShader = `
                  attribute vec3 position3DHigh;
                  attribute vec3 position3DLow;
                  attribute vec2 position;
                  attribute vec3 normal;
                  attribute vec2 st;
                  attribute float batchId;
                  varying vec2 v_st;
                  varying vec3 v_positionEC;
                  varying vec3 v_normalEC;
                  void main()
                  {
                    // vec4 p = czm_translateRelativeToEye(position3DHigh, position3DLow); // czm_computePosition();
                    // v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
                    // v_normalEC = czm_normal * normal;                         // normal in eye coordinates
                    // v_st = st;
                  
                    // gl_Position = czm_modelViewProjectionRelativeToEye * p;
                    v_st = st;
                    gl_Position = vec4(position, 1.0, 1.0);
                  }
                `

    let vtxfFragmentShader = `
                  #extension GL_EXT_frag_depth : enable
                  varying vec2 v_st;
                  uniform sampler2D udImage;
                  uniform sampler2D udDepth;
                    //RGBA to Float from https://github.com/ihmeuw/glsl-rgba-to-float/blob/master/index.glsl
                    // Denormalize 8-bit color channels to integers in the range 0 to 255.
                    ivec4 floatsToBytes(vec4 inputFloats, bool littleEndian) {
                      ivec4 bytes = ivec4(inputFloats * 255.0);
                      return (
                        littleEndian
                        ? bytes.abgr
                        : bytes
                      );
                    }
                    // Break the four bytes down into an array of 32 bits.
                    void bytesToBits(const in ivec4 bytes, out bool bits[32]) {
                      for (int channelIndex = 0; channelIndex < 4; ++channelIndex) {
                        float acc = float(bytes[channelIndex]);
                        for (int indexInByte = 7; indexInByte >= 0; --indexInByte) {
                          float powerOfTwo = exp2(float(indexInByte));
                          bool bit = acc >= powerOfTwo;
                          bits[channelIndex * 8 + (7 - indexInByte)] = bit;
                          acc = mod(acc, powerOfTwo);
                        }
                      }
                    }
                    // Compute the exponent of the 32-bit float.
                    float getExponent(bool bits[32]) {
                      const int startIndex = 1;
                      const int bitStringLength = 8;
                      const int endBeforeIndex = startIndex + bitStringLength;
                      float acc = 0.0;
                      int pow2 = bitStringLength - 1;
                      for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {
                        acc += float(bits[bitIndex]) * exp2(float(pow2--));
                      }
                      return acc;
                    }
                    // Compute the mantissa of the 32-bit float.
                    float getMantissa(bool bits[32], bool subnormal) {
                      const int startIndex = 9;
                      const int bitStringLength = 23;
                      const int endBeforeIndex = startIndex + bitStringLength;
                      // Leading/implicit/hidden bit convention:
                      // If the number is not subnormal (with exponent 0), we add a leading 1 digit.
                      float acc = float(!subnormal) * exp2(float(bitStringLength));
                      int pow2 = bitStringLength - 1;
                      for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {
                        acc += float(bits[bitIndex]) * exp2(float(pow2--));
                      }
                      return acc;
                    }
                    // Parse the float from its 32 bits.
                    float bitsToFloat(bool bits[32]) {
                      float signBit = float(bits[0]) * -2.0 + 1.0;
                      float exponent = getExponent(bits);
                      bool subnormal = abs(exponent - 0.0) < 0.01;
                      float mantissa = getMantissa(bits, subnormal);
                      float exponentBias = 127.0;
                      return signBit * mantissa * exp2(exponent - exponentBias - 23.0);
                    }
                    // Decode a 32-bit float from the RGBA color channels of a texel.
                    float rgbaToFloat(vec4 texelRGBA, bool littleEndian) {
                      ivec4 rgbaBytes = floatsToBytes(texelRGBA, littleEndian);
                      bool bits[32];
                      bytesToBits(rgbaBytes, bits);
                      return bitsToFloat(bits);
                    }
                    float DecodeExp(vec4 pack ){
                      int exponent = int( pack.w * 256.0 - 127.0 );
                      float value  = dot( pack.xyz, 1.0 / vec3(1.0, 256.0, 256.0*256.0) );
                      value = value * (2.0*256.0*256.0*256.0) / (256.0*256.0*256.0 - 1.0) - 1.0;
                      return value * exp2( float(exponent) );
                    }
                    float DecodeFloatRGBA (vec4 v) {
                      const vec4 bitEnc = vec4(1.0,255.0,65025.0,16581375.0);
                      const vec4 bitDec = 1.0/bitEnc;
                      return dot(v, bitDec);
                    }
                    void main()
                    {
                      float far=gl_DepthRange.far;
                      float near=gl_DepthRange.near;
                      gl_FragColor = texture2D(udImage, v_st).bgra;
                      //float distanceF = texture2D(udDepth, v_st).w;
                      float distanceF = rgbaToFloat(texture2D(udDepth, v_st), true);
                      if (distanceF == 1.0)
                          discard;
                      vec4 clipPosition = vec4(v_st * 2.0 - 1.0, distanceF, 1.0);
                      vec4 eyePosition = czm_inverseProjection * clipPosition;
                      eyePosition /= eyePosition.w;
                      float distanceM = length((czm_inverseView * eyePosition).xyz - czm_viewerPositionWC);
                      
                      
                      float depthOrLogDepth = czm_unpackDepth(texture2D(udDepth, v_st));
                      vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depthOrLogDepth);
                      eyeCoordinate /= eyeCoordinate.w;
                      //float depth_tw = eyeCoordinate.z / eyeCoordinate.w;

                      #ifdef LOG_DEPTH
                        czm_writeLogDepth((czm_projection * vec4(eyePosition.xyz, 1.0)).w + 1.0);
                      #else
                        gl_FragDepthEXT = czm_eyeToWindowCoordinates(vec4(eyePosition.xyz, 1.0)).z;
                      #endif
                    }
                `

    function createVertexArray(context) {
      let geometry = new Cesium.Geometry({
        attributes: {
          position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE, //DOUBLE  FLOAT
            componentsPerAttribute: 2,
            values: positions,
          }),
          textureCoordinates: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 2,
            values: sts,
          }),
        },
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
      })

      let vertexArray = Cesium.VertexArray.fromGeometry({
        context: context,
        geometry: geometry,
        attributeLocations: attributeLocations,
        bufferUsage: Cesium.BufferUsage.STATIC_DRAW,
      })

      return vertexArray
    }

    function createCommand(context) {
      let _self = this
      let translucent = false
      let closed = true

      let rawRenderState = Cesium.Appearance.getDefaultRenderState(
        translucent,
        closed,
        undefined
      )
      let renderState = Cesium.RenderState.fromCache(rawRenderState)

      let vertexShaderSource = new Cesium.ShaderSource({
        sources: [vtxfVertexShader],
      })

      let fragmentShaderSource = new Cesium.ShaderSource({
        sources: [vtxfFragmentShader],
      })
      let uniformMap = {
        udImage: function () {
          if (Cesium.defined(_self.colourTextureGL)) {
            return _self.colourTextureGL
          } else {
            return context.defaultTexture
          }
        },
        udDepth: function () {
          if (Cesium.defined(_self.udTextureDepth)) {
            return _self.udTextureDepth
          } else {
            return context.defaultTexture
          }
        },
      }

      let shaderProgram = Cesium.ShaderProgram.fromCache({
        context: context,
        vertexShaderSource: vertexShaderSource,
        fragmentShaderSource: fragmentShaderSource,
        attributeLocations: attributeLocations,
      })

      return new Cesium.DrawCommand({
        vertexArray: createVertexArray(context),
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        renderState: renderState,
        shaderProgram: shaderProgram,
        uniformMap: uniformMap,
        owner: this,
        pass: Cesium.Pass.OPAQUE,
      })
    }

    this.show = true
    this._command = undefined
    this._createCommand = createCommand
  }

  setResolution = (viewer) => {
    // Control Resolution
    let scale = 1.0
    let thisWidth = parseInt(viewer.canvas.width * scale)
    let thisHeight = parseInt(viewer.canvas.height * scale)
    return [thisWidth, thisHeight]
  }

  updateStatus(value) {
    this.udSDKReady = value
  }

  update(frameState) {
    if (!this.show) {
      return
    }
    if (this.udSDKReady == 2) {
      let widthHeight = this.setResolution(this.viewer)
      let thisWidth = widthHeight[0]
      let thisHeight = widthHeight[1]

      if (thisWidth != this.prevWidth || thisHeight != this.prevHeight) {
        this.prevWidth = thisWidth
        this.prevHeight = thisHeight

        udSDKJS_ResizeScene(thisWidth, thisHeight, 0, 0)

        var context = this.viewer.scene.context
        this.colourTextureGL.destroy()
        this.colourTextureGL = new Cesium.Texture({
          context: context,
          pixelFormat: Cesium.PixelFormat.RGBA,
          width: thisWidth,
          height: thisHeight,
        })
        this.udTextureDepth.destroy()
        this.udTextureDepth = new Cesium.Texture({
          context: context,
          pixelFormat: Cesium.PixelFormat.RGBA,
          width: thisWidth,
          height: thisHeight,
        })
      }
      //mat4.multiply(newMatrix, frameState.camera.frustum.projectionMatrix, frameState.camera.viewMatrix)
      //newMatrix =  frameState.camera.frustum._offCenterFrustum._perspectiveMatrix
      let v = frameState.camera.viewMatrix
      udSDKJS_SetMatrix(
        'view',
        v[0],
        v[1],
        v[2],
        v[3],
        v[4],
        v[5],
        v[6],
        v[7],
        v[8],
        v[9],
        v[10],
        v[11],
        v[12],
        v[13],
        v[14],
        v[15]
      )

      v = frameState.camera.frustum.projectionMatrix
      udSDKJS_SetMatrix(
        'projection',
        v[0],
        v[1],
        v[2],
        v[3],
        v[4],
        v[5],
        v[6],
        v[7],
        v[8],
        v[9],
        v[10],
        v[11],
        v[12],
        v[13],
        v[14],
        v[15]
      )

      udSDKJS_RenderQueue()

      let ptr = udSDKJS_GetColourBuffer()
      let data = new Uint8Array(
        HEAPU8.subarray(ptr, ptr + thisWidth * thisHeight * 4)
      )

      if (Cesium.VERSION > '1.82') {
        this.colourTextureGL.copyFrom({
          source: {
            width: thisWidth,
            height: thisHeight,
            arrayBufferView: data,
          },
        })
      } else {
        this.colourTextureGL.copyFrom({
          width: thisWidth,
          height: thisHeight,
          arrayBufferView: data,
        })
      }

      ptr = udSDKJS_GetDepthBuffer()
      let dataHeap = new Uint8Array(
        HEAPU8.subarray(ptr, ptr + thisWidth * thisHeight * 4)
      )

      if (Cesium.VERSION > '1.82') {
        this.udTextureDepth.copyFrom({
          source: {
            width: thisWidth,
            height: thisHeight,
            arrayBufferView: dataHeap,
          },
        })
      } else {
        this.udTextureDepth.copyFrom({
          width: thisWidth,
          height: thisHeight,
          arrayBufferView: dataHeap,
        })
      }

      if (!Cesium.defined(this._command)) {
        this._command = this._createCommand(frameState.context)
      }

      if (Cesium.defined(this._command)) {
        frameState.commandList.push(this._command)
      }
    }
  }

  isDestroyed() {
    return false
  }

  destroy() {
    if (Cesium.defined(this._command)) {
      this._command.shaderProgram =
        this._command.shaderProgram && this._command.shaderProgram.destroy()
    }
    return destroyObject(this)
  }
}

const _flyCamera = (viewer, location, duration) => {
  if (viewer == null) {
    console.log('Viewer is not defined!')
    return
  }

  viewer.camera.flyToBoundingSphere(
    new Cesium.BoundingSphere(
      Cesium.Cartesian3.fromDegrees(
        location.position[0],
        location.position[1],
        location.position[2]
      ),
      500 + location.offset / 10
    )
  )
  return true
}

const loadUDSModel = async (model) => {
  if (model === null) return false
  let loadModel = await udSDKJS_LoadModel(model.url)
  udSDKJS_RenderQueueAddModel(loadModel, model.eval[0], model.eval[1])
  console.log('Model Loaded: ', model.key)
}
