# FAQs

**Why can't I see my model?**
Ensure the model is enabled: a tick should appear in the tickbox next to the model name in the Scene Explorer window.

**How do I lock altitude when moving the camera?**
Press the Space bar to toggle or press the lock altitude button in the 'status' window (bottom right of the Scene window). See Scene Info and Controls (in [Settings](./settings.md)) for more information.

**How do I load my previous projects?**
You can load a project that you saved to disk by clicking the Import button at the top of the window and browsing to where you saved your project.json file.

**How do I convert into UDS?**
Select the Convert window and type the destination path and name for the converted file in the Output Name field (the system will add the .uds extension once you click out of that field if you don't enter it). Drag and drop the file you want to convert on to the Convert window. Fill out other fields as required. Refer to Convert in this guide for detailed instructions.

**A converting error occurred, what do I do?**
Due to either corrupt or incomplete data, clicking the 'Continue processing after corrupt/incomplete data (where possible)' tickbox will let the conversion process know that it should attempt to complete the convert process, ignoring data integrity. Euclideon cannot guarantee that the model will convert correctly or that if it does, it will be a useful rendering.

**I am dragging my file to convert onto the convert window, but nothing is happening. What do I do?**
Confirm that the file type is supported for conversion by udStream.

**I want to demonstrate key features of my 3D model, how can I do that?**
Check out the Visualisation category under [Settings](./settings.md).

**How do I adjust the mouse controls?**
View Mouse Pivot bindings in the Input and Controls menu in [Settings](./settings.md).

**My 3d object is hidden behind the map. How do I see it?**
Changing the Transparency or the Blending in Maps and Elevation (in [Settings](./settings.md)) may make it easier to see your object, using a combination of these for varied affect.

**I keep getting the "logged out" screen, how do I fix this issue?**
Check your internet access and try again.

**I cannot log in**
Check your internet connection, and ensure you have used the correct URL, username, and password. Make sure your URL has a closed bracket at the end of it if using the default server URL.

**I cannot connect to the udStream Server, how do I resolve this issue?**
Check your firewall or proxy settings. If running a proxy, check with your IT department that the address is correct and that the correct port is set.

**My proxy is not working, why?**
Adopt the proxy format of protocol://username:password\@domain/URI. Network metadata is not transmitted when using proxies and is stored in plain text file, which may assist solving connection issues.

**Could not open a secure channel. Why is this popping up?**
If you are using a proxy, your network may not be sending encrypted data. Ticking the "ignore certificate verification" may circumvent this issue. Note: Network Security certificates will not be verified.

# Technical Requirements

  - udStream OpenGL: Requires OpenGL version 3.2 and up-to-date graphics drivers.
  - udStream DirectX11: Requires DirectX 11 and up-to-date graphics drivers.
  - A reliable Internet Connection with adequate bandwidth.
  - A valid License is needed to unlock the Premium features of udStream

# Third Party Licenses

udStream uses a number of third party libraries. Goto Scene Profile Menu > Settings > About for full license information.
  - Dear ImGui from [GitHub](https://github.com/ocornut/imgui)
  - ImGuizmo from [GitHub](https://github.com/CedricGuillemet/ImGuizmo)
  - libSDL2 from [libsdl](https://libsdl.org)
  - GLEW from [SourceForge](http://glew.sourceforge.net/)
  - Nothings/STB single header libraries from [GitHub](https://github.com/nothings/stb)
  - ImGuizmo from [GitHub](https://github.com/CedricGuillemet/ImGuizmo)
  - easyexif available at [Euclideon's GitHub](https://github.com/euclideon/easyexif) forked originally from [GitHub](https://github.com/mayanklahiri/easyexif)
  - Autodesk FBX SDK from [Autodesk FBX SDK Download Page](https://www.autodesk.com/developer-network/platform-technologies/fbx-sdk-2019-5)
  - Atmosphere from [Evasion](http://www-evasion.imag.fr/Membres/Eric.Bruneton/)
  - Poly2tri from [Github](https://github.com/jhasse/poly2tri)
  - libtif from [GitLab](https://gitlab.com/libtiff/libtiff)
  - UTF-8 Decoder from [URL](https://bjoern.hoehrmann.de/utf-8/decoder/dfa/)

Euclideon udSDK uses the following additional libraries.
  - cURL from [GitHub](https://github.com/curl/curl)
  - libdeflate from [GitHub](https://github.com/ebiggers/libdeflate)
  - mbedtls from [GitHub](https://github.com/ARMmbed/mbedtls)
  - miniz from [GitHub](https://github.com/richgel999/miniz)
