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