# Importing Project Data

udStream supports importing project data from:
  - Geoverse UDP
  - CSV (Annotations only)
  - 12DXML (excluding TINs)
  - ShapeFiles (exluding TINs)

## File Encodings

udStream supports UTF-8 encoded text files only. If you want to load a file in udStream that is not UTF-8, you will have to change the encoding. You can do this a number of ways but perhaps the easiest is to load the file in notepad in Windows, click 'File' and then 'Save As...'. Choose a file name and next to the 'Save' button set the encoding to UTF-8 and click 'Save'. This new file should now load in udStream.

## 12DXML support

udStream has limited support for 12dxml files. Drag and drop your file into udStream to load the file.

> If the file encoding is not supported, you can change the encoding as described above or alternatively, in the software you created the file, export the project again as UTF-8.

Currently only a part of the 12dxml spec is supported. More features may be supported in future releases.
Check back, or if you have a specific request for a 12dxml feature, let us know at <support@euclideon.com>. Otherwise, udStream will try to convert a 12dxml file in the follow manner:

- All Models will be extracted and loaded as folders in the scene explorer
- Super strings from within models will be extracted and stored in the model folder. The following super string elements are supported:
    -   3D points and point lists will load as Annotations and Lines of Interest respectively
        - Both the data\_3d and data\_2d tag are supported
    -   Names
    -   Colours
    -   The null and colour command is supported and can be set once per string
