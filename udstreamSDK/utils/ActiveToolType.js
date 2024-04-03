/**
 * Enumerates the available input for interacting with the tool.
 *
 * @enum {Number}
 */
var ActiveTool = {
    /**
     * Can select items and camera input works as expected.
     *
     * @type {Number}
     * @constant
     */
    Select: 0,

    /**
     *  Clicking places nodes in the current selected POI (or creates one if the current selected item isn't a POI)
     *
     * @type {Number}
     * @constant
     */
    MeasureLine: 1,

    /**
     *  Clicking places nodes in the current selected POI (or creates one if the current selected item isn't a POI)
     *
     * @type {Number}
     * @constant
     */
    MeasureArea: 2,

    /**
     * Clicking places nodes in the current selected POI (or creates one if the current selected item isn't a POI)
     *
     * @type {Number}
     * @constant
     */
    MeasureHeight: 3,

    /**
     * Single POI
     *
     * @type {Number}
     * @constant
     */
    Annotate: 4,
    /**
     * Inspects the voxel under the mouse
     *
     * @type {Number}
     * @constant
     */
    Inspect: 5,

    /**
     *  Add box filter at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddBoxFilter: 6,

    /**
     *  Add sphere filter at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddSphereFilter: 7,

    /**
     * Add cylinder filter at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddCylinderFilter: 8,

    /**
     * Add polygon filter at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddPolygonFilter: 9,
    /**
     * Add simple cross section filter at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddSimpleCrossSection: 10,

    /**
     *
     * @type {Number}
     * @constant
     */
    AddSectionView: 11,

    /**
     *  Add a viewshed at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddViewShed: 12,

    /**
     * Add Places to the Places Layer
     *
     * @type {Number}
     * @constant
     */
    Placement: 13,

    /**
     * Add a media node at the current mouse position
     *
     * @type {Number}
     * @constant
     */
    AddMedia: 14,
    /**
     * Add viewpoint camera bounds sphere
     *
     * @type {Number}
     * @constant
     */
    ViewpointBounds: 15,

    /**
     *
     * @type {Number}
     * @constant
     */
    UDSPick: 16,

    /**
     *
     * @type {Number}
     * @constant
     */
    DangerReport: 17,

    /**
     *
     * @type {Number}
     * @constant
     */
    MeasuredResults: 18,

    /**
     *
     * @type {Number}
     * @constant
     */
    VerticalLineMeasurements: 19,

    /**
     *
     * @type {Number}
     * @constant
     */
    UDSPickGeneral: 20,

    /**
     *
     * @type {Number}
     * @constant
     */
    Count: 21,
};
export default Object.freeze(ActiveTool);