import fetch from 'node-fetch';
import base64 from 'base-64';

const zoomAccountId = "j3jOCRFJSCaaVGtvUKXN0A";
const zoomClientId = "1tmexNAZS5k1uBBMv_khg";
const zoomClientSecret = "V9DhV0qe1tqitFKS2BpQXHrXIglDVlUX";

const getAuthHeaders = () => {
  return {
    Authorization: `Basic ${base64.encode(`${zoomClientId}:${zoomClientSecret}`)}`,
    "Content-Type": "application/json",
  };
};

const generateZoomAccessToken = async () => {
  try {
    const response = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
      { method: "POST", headers: getAuthHeaders() }
    );

    const jsonResponse = await response.json();
    return jsonResponse?.access_token;
  } catch (error) {
    console.log("generateZoomAccessToken Error --> ", error);
    throw error;
  }
};

export const generateZoomMeeting = async () => {
  try {
    const zoomAccessToken = await generateZoomAccessToken();

    const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${zoomAccessToken}`,
      },
      body: JSON.stringify({
        agenda: "Zoom Meeting for YT Demo",
        duration: 60,
        password: "12345",
        start_time: new Date().toISOString(),
        timezone: "Asia/Kolkata",
        topic: "Zoom Meeting for YT Demo",
        type: 2,
      }),
    });

    const jsonResponse = await response.json();
    console.log("generateZoomMeeting JsonResponse --> ", jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log("generateZoomMeeting Error --> ", error);
    throw error;
  }
};

