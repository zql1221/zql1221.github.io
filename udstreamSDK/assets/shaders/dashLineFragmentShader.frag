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

uniform highp sampler2D SPIRV_Cross_CombinedcolourTexturecolourSampler;

in highp vec4 varying_COLOR0;
in highp vec2 varying_TEXCOORD0;
in highp vec2 varying_TEXCOORD1;
layout(location = 0) out highp vec4 out_var_SV_Target0;
layout(location = 1) out highp vec4 out_var_SV_Target1;

void main()
{
    highp vec4 _46 = texture(SPIRV_Cross_CombinedcolourTexturecolourSampler, varying_TEXCOORD1);
    highp float _69;
    do
    {
        if (varying_TEXCOORD0.y != 0.0)
        {
            _69 = varying_TEXCOORD0.x / varying_TEXCOORD0.y;
            break;
        }
        _69 = log2(varying_TEXCOORD0.x) * (1.0 / log2(u_cameraPlaneParams.s_CameraFarPlane + 1.0));
        break;
    } while(false);
    out_var_SV_Target0 = vec4(varying_COLOR0.xyz, step(_46.x, 0.00999999977648258209228515625));
    out_var_SV_Target1 = vec4(0.0, ((step(0.0, 0.0) * 2.0) - 1.0) * _69, 0.0, 0.0);
    gl_FragDepth = _69;
}

