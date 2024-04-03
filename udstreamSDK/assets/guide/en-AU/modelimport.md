# Importing Model Data

udStream supports importing model data from:
  - glTF 2.0

## File Encodings

udStream supports UTF-8 encoded text files only. If you want to load a file in udStream that is not UTF-8, you will have to change the encoding. You can do this a number of ways but perhaps the easiest is to load the file in notepad in Windows, click 'File' and then 'Save As...'. Choose a file name and next to the 'Save' button set the encoding to UTF-8 and click 'Save'. This new file should now load in udStream.

## glTF 2.0 support

glTF™ (GL Transmission Format) is a royalty-free specification for the efficient transmission and loading of 3D scenes and models by engines and applications.
Drag and drop your JSON file(.gltf) into udStream to load the file. UdStream will automatically load all relevant files. 

udStream supports the following glTF 2.0 features:
  - Models
  - Meshes
  - Materials
  - Textures
  - Animation 

File Format Variations:
The glTF specification identifies different ways the data can be stored. UdStream supports all of these ways.
  - glTF Binary (.glb). This file format is a single .glb file with all mesh data, image textures, and related information packed into a single binary file.
  - glTF Separate (.gltf + .bin + textures). This file format includes a JSON text-based .gltf file describing the overall structure, along with a .bin file containing mesh and vector data, and optionally a number of .png or .jpg files containing image textures referenced by the .gltf file.
  - glTF Embedded (.gltf). This file format is a JSON text-based .gltf file, with all mesh data and image data encoded (using Base64) within the file. 
  
Extensions:
udStream supports Draco extension, which defines a schema to use Draco geometry compression (non-normative) libraries in glTF format. This allows glTF to support streaming compressed geometry data instead of the raw data. 

