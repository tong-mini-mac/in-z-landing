# Score Board Live Manual

Club sports scoreboard overlay — you mix camera + Overlay in your own encoder app. Video never goes through IN Z servers.

## How it works

1. Open Score Board from your IN Z account (SSO)
2. Copy the **Overlay URL** into a Browser Source / Web Widget
3. Update scores from a second device (phone/tablet)
4. Go live to Facebook or YouTube from the encoder app with a stream key — not the in-app Facebook/YouTube camera

## Steps

### 1. Open from IN Z and set the match

Choose sport, 2–4 player/team names, house rules, and **Day / Night** for the score bar, then save the match.

Sports: snooker · football · volleyball · badminton · tennis · generic · team vs team · chess · TCG · cards

### 2. Copy the Overlay URL

Copy it from the home screen. Paste it only into your encoder — treat it like a password and do not post it publicly.

### 3. Open the scorer on a phone

On a second device, open the score panel. Update scores, names, sponsors, and handicap; the overlay refreshes immediately.

### 4. Add the Overlay in your encoder app

**Desktop (recommended)**

| App | How to add Overlay |
| --- | --- |
| OBS Studio | Sources → Browser → paste Overlay URL · size equal to canvas (1920×1080 or 1080×1920) · transparent background |
| Streamlabs Desktop | Same Browser Source flow |
| PRISM Live Studio | Webpage / Browser source |

**Mobile**

| App | How to add Overlay |
| --- | --- |
| Larix Broadcaster | Web Widget (**HTTPS** required) |
| PRISM Live Studio | Webpage source |
| Streamlabs Mobile | Add URL / web overlay (**HTTPS** required) |

### 5. Go live with a stream key

1. Open the encoder, add the camera as the main layer, put Overlay on top
2. Set destination to **Facebook Live Producer** or **YouTube Studio → Streaming software**
3. Start Streaming in the encoder app
4. Do **not** use the in-app Facebook/YouTube camera — those cannot load this overlay

### 6. Update scores during the live

Tap scores on the phone while live; the Browser Source updates. End the stream in the encoder app.

## Tips

- **Day** = light bar / dark text (bright rooms) · **Night** = dark bar / light text (dark halls)
- Empty sponsor slots stay transparent on the overlay
- Mobile encoders need HTTPS to load the Overlay Web Widget
