#version 300 es
precision mediump float;
precision highp int;

layout(std140) uniform type_u_cameraPlaneParams
{
    highp float s_CameraNearPlane;
    highp float s_CameraFarPlane;
    highp float u_clipZNear;
    highp float u_clipZFar;
} u_cameraPlaneParams;

layout(std140) uniform type_u_EveryFrameFrag
{
    highp vec4 u_specularDir;
    layout(row_major) highp mat4 u_eyeNormalMatrix;
    layout(row_major) highp mat4 u_inverseViewMatrix;
} u_EveryFrameFrag;

uniform highp sampler2D SPIRV_Cross_CombinednormalMapTexturenormalMapSampler;
uniform highp sampler2D SPIRV_Cross_CombinedskyboxTextureskyboxSampler;

in highp vec2 varying_TEXCOORD0;
in highp vec2 varying_TEXCOORD1;
in highp vec4 varying_COLOR0;
in highp vec4 varying_COLOR1;
in highp vec2 varying_TEXCOORD2;
layout(location = 0) out highp vec4 out_var_SV_Target0;
layout(location = 1) out highp vec4 out_var_SV_Target1;

void main()
{
    highp vec4 _71 = texture(SPIRV_Cross_CombinednormalMapTexturenormalMapSampler, varying_TEXCOORD0);
    highp vec4 _76 = texture(SPIRV_Cross_CombinednormalMapTexturenormalMapSampler, varying_TEXCOORD1);
    highp vec3 _81 = normalize(((_71.xyz * vec3(2.0)) - vec3(1.0)) + ((_76.xyz * vec3(2.0)) - vec3(1.0)));
    highp vec3 _83 = normalize(varying_COLOR0.xyz);
    highp vec3 _92 = normalize((vec4(_81, 0.0) * u_EveryFrameFrag.u_eyeNormalMatrix).xyz);
    highp vec3 _113 = normalize((vec4(normalize(reflect(_83, _92)), 0.0) * u_EveryFrameFrag.u_inverseViewMatrix).xyz);
    highp vec4 _123 = texture(SPIRV_Cross_CombinedskyboxTextureskyboxSampler, vec2(atan(_113.x, _113.y) + 3.1415927410125732421875, acos(_113.z)) * vec2(0.15915493667125701904296875, 0.3183098733425140380859375));
    highp float _150;
    do
    {
        if (varying_TEXCOORD2.y != 0.0)
        {
            _150 = varying_TEXCOORD2.x / varying_TEXCOORD2.y;
            break;
        }
        _150 = log2(varying_TEXCOORD2.x) * (1.0 / log2(u_cameraPlaneParams.s_CameraFarPlane + 1.0));
        break;
    } while(false);
    out_var_SV_Target0 = vec4(mix(varying_COLOR1.xyz * mix(vec3(1.0, 1.0, 0.60000002384185791015625), vec3(0.3499999940395355224609375), vec3(pow(max(0.0, _81.z), 5.0))), _123.xyz * 2.0, vec3(pow(0.5 - (dot(_92, _83) * (-0.5)), 2.0))), 1.0);
    out_var_SV_Target1 = vec4(0.0, ((step(0.0, 0.0) * 2.0) - 1.0) * _150, 0.0, 0.0);
    gl_FragDepth = _150;
}

