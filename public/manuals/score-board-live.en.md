# Score Board Live Manual

Mix camera + Overlay in your encoder app — video never goes through IN Z servers.

## Steps

### 1. Open from IN Z and set the match

Choose sport, 2–4 player/team names, house rules, and **Day / Night**, then save.

### 2. Copy the Overlay URL

Paste it only into your encoder — do not post it publicly.

### 3. Open the scorer on a phone

Update scores, names, sponsors, and handicap — the overlay refreshes immediately.

### 4. Add the Overlay in your encoder

**Desktop**

| App | How |
| --- | --- |
| OBS Studio | Sources → Browser → paste Overlay URL · size equal to canvas · transparent background |
| Streamlabs Desktop | Same Browser Source flow |
| PRISM Live Studio | Webpage / Browser source |

**Mobile** (**HTTPS** required)

| App | How |
| --- | --- |
| Larix Broadcaster | Web Widget |
| PRISM Live Studio | Webpage source |
| Streamlabs Mobile | Add URL / web overlay |

### 5. Go live with a stream key

1. Camera as main layer, Overlay on top
2. Destination: **Facebook Live Producer** or **YouTube Studio → Streaming software**
3. Start Streaming in the encoder
4. Do not use the in-app Facebook/YouTube camera

### 6. Update scores during the live

Tap scores on the phone · end the stream in the encoder.

## Tips

- Day = light bar / dark text · Night = dark bar / light text
- Empty sponsor slots stay transparent on the overlay
