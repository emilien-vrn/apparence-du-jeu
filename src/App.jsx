import { useState } from "react";

const AppearanceEditor = () => {
  const [activeSection, setActiveSection] = useState("logo");
  const [logo, setLogo] = useState(null);
  const [bgType, setBgType] = useState("color");
  const [bgColor, setBgColor] = useState("#2a2151");
  const [bgGradient1, setBgGradient1] = useState("#2a2151");
  const [bgGradient2, setBgGradient2] = useState("#1e1740");
  const [titleText, setTitleText] = useState("PARTICIPEZ À NOTRE JEU ET TENTEZ DE GAGNER UN CADEAU");
  const [titleColor, setTitleColor] = useState("#FFFFFF");
  const [titleSize, setTitleSize] = useState(16);
  const [btnText, setBtnText] = useState("JOUER !");
  const [btnColor, setBtnColor] = useState("#F5A623");
  const [btnTextColor, setBtnTextColor] = useState("#1a1a1a");
  const [btnRadius, setBtnRadius] = useState(30);
  const [wheelColors, setWheelColors] = useState(["#F5A623", "#e53e3e", "#2a2151", "#059669"]);
  const [wheelTextColor, setWheelTextColor] = useState("#FFFFFF");
  const [footerText, setFooterText] = useState("Propulsé par Cadeo");
  const [footerColor, setFooterColor] = useState("#999999");
  const [showRulesLink, setShowRulesLink] = useState(true);

  const sections = [
    { id: "logo", icon: "🖼️", label: "Logo" },
    { id: "fond", icon: "🎨", label: "Fond" },
    { id: "texte", icon: "✏️", label: "Texte" },
    { id: "bouton", icon: "👆", label: "Bouton" },
    { id: "roue", icon: "🎡", label: "Roue" },
    { id: "footer", icon: "📄", label: "Pied de page" },
  ];

  const presetColors = ["#2a2151","#1a1a1a","#FFFFFF","#F5A623","#e53e3e","#059669","#3b82f6","#ec4899","#8b5cf6","#0d9488","#f97316","#64748b"];

  const ColorPicker = ({ value, onChange, label }) => (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={s.fieldLabel}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: value, border: "2px solid #eee", cursor: "pointer" }} />
          <input type="color" value={value} onChange={e => onChange(e.target.value)} style={{ position: "absolute", top: 0, left: 0, width: 36, height: 36, opacity: 0, cursor: "pointer" }} />
        </div>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} style={{ ...s.input, flex: 1, fontFamily: "monospace", fontSize: 13 }} />
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        {presetColors.map(c => (
          <div key={c} onClick={() => onChange(c)} style={{ width: 22, height: 22, borderRadius: 6, background: c, border: value === c ? "2px solid #2a2151" : "2px solid #eee", cursor: "pointer", transition: "transform 0.15s", ...(value === c ? { transform: "scale(1.15)" } : {}) }} />
        ))}
      </div>
    </div>
  );

  const SliderField = ({ label, value, onChange, min, max, unit = "px" }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ ...s.fieldLabel, display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span style={{ color: "#2a2151", fontWeight: 700 }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: "100%", accentColor: "#2a2151" }} />
    </div>
  );

  const renderPanel = () => {
    switch (activeSection) {
      case "logo":
        return (
          <div>
            <div style={s.panelTitle}>Logo</div>
            <div style={s.panelDesc}>Ajoutez le logo de votre établissement. Il apparaît en haut de la page de jeu.</div>
            <div style={s.uploadZone}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#333" }}>Glissez votre logo ici</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>PNG, JPG ou SVG • Max 2 Mo</div>
              <button style={s.uploadBtn}>Parcourir les fichiers</button>
            </div>
            <div style={{ marginTop: 16, padding: 14, background: "#f9f9f9", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fff", border: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#999" }}>LOGO</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>logo-restaurant.png</div>
                <div style={{ fontSize: 11, color: "#999" }}>42 Ko • 200×200px</div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#e53e3e", fontSize: 13, fontWeight: 600 }}>Supprimer</button>
            </div>
          </div>
        );

      case "fond":
        return (
          <div>
            <div style={s.panelTitle}>Arrière-plan</div>
            <div style={s.panelDesc}>Choisissez le fond de votre page de jeu.</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[{ id: "color", label: "Couleur unie" }, { id: "gradient", label: "Dégradé" }, { id: "image", label: "Image" }].map(t => (
                <button key={t.id} onClick={() => setBgType(t.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: bgType === t.id ? "2px solid #2a2151" : "1.5px solid #eee", background: bgType === t.id ? "#f3f0ff" : "#fff", fontWeight: 600, fontSize: 13, color: bgType === t.id ? "#2a2151" : "#888", cursor: "pointer", transition: "all 0.15s" }}>
                  {t.label}
                </button>
              ))}
            </div>
            {bgType === "color" && <ColorPicker label="Couleur de fond" value={bgColor} onChange={setBgColor} />}
            {bgType === "gradient" && (
              <>
                <ColorPicker label="Couleur début" value={bgGradient1} onChange={setBgGradient1} />
                <ColorPicker label="Couleur fin" value={bgGradient2} onChange={setBgGradient2} />
                <div style={{ height: 40, borderRadius: 10, background: `linear-gradient(180deg, ${bgGradient1}, ${bgGradient2})`, marginTop: 8 }} />
              </>
            )}
            {bgType === "image" && (
              <div style={s.uploadZone}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🖼️</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#333" }}>Glissez votre image ici</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>PNG ou JPG • Résolution recommandée : 1080×1920px</div>
                <button style={s.uploadBtn}>Parcourir les fichiers</button>
              </div>
            )}
          </div>
        );

      case "texte":
        return (
          <div>
            <div style={s.panelTitle}>Texte du jeu</div>
            <div style={s.panelDesc}>Personnalisez le message affiché sur la page de jeu.</div>
            <div style={{ marginBottom: 16 }}>
              <div style={s.fieldLabel}>Message principal</div>
              <textarea value={titleText} onChange={e => setTitleText(e.target.value)} rows={3} style={{ ...s.input, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
            </div>
            <ColorPicker label="Couleur du texte" value={titleColor} onChange={setTitleColor} />
            <SliderField label="Taille du texte" value={titleSize} onChange={setTitleSize} min={10} max={28} />
            <div style={{ padding: 14, background: "#f9f9f9", borderRadius: 10, marginTop: 8 }}>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 6, fontWeight: 600 }}>APERÇU</div>
              <div style={{ fontSize: titleSize, fontWeight: 800, color: titleColor, background: bgType === "gradient" ? `linear-gradient(180deg, ${bgGradient1}, ${bgGradient2})` : bgColor, padding: "14px 16px", borderRadius: 8, textAlign: "center", fontStyle: "italic", lineHeight: 1.3 }}>
                {titleText}
              </div>
            </div>
          </div>
        );

      case "bouton":
        return (
          <div>
            <div style={s.panelTitle}>Bouton</div>
            <div style={s.panelDesc}>Personnalisez le bouton d'appel à l'action.</div>
            <div style={{ marginBottom: 16 }}>
              <div style={s.fieldLabel}>Texte du bouton</div>
              <input type="text" value={btnText} onChange={e => setBtnText(e.target.value)} style={s.input} />
            </div>
            <ColorPicker label="Couleur du bouton" value={btnColor} onChange={setBtnColor} />
            <ColorPicker label="Couleur du texte" value={btnTextColor} onChange={setBtnTextColor} />
            <SliderField label="Arrondi" value={btnRadius} onChange={setBtnRadius} min={0} max={50} />
            <div style={{ padding: 14, background: "#f9f9f9", borderRadius: 10, marginTop: 8 }}>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 10, fontWeight: 600 }}>APERÇU</div>
              <div style={{ textAlign: "center" }}>
                <button style={{ padding: "12px 40px", fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", background: btnColor, color: btnTextColor, borderRadius: btnRadius, letterSpacing: 1 }}>
                  {btnText}
                </button>
              </div>
            </div>
          </div>
        );

      case "roue":
        return (
          <div>
            <div style={s.panelTitle}>Roue de la fortune</div>
            <div style={s.panelDesc}>Personnalisez les couleurs des segments et du curseur.</div>
            <div style={s.fieldLabel}>Couleurs des segments</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {wheelColors.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f9f9f9", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>#{i+1}</div>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: c, border: "2px solid #eee", cursor: "pointer" }} />
                    <input type="color" value={c} onChange={e => { const nc = [...wheelColors]; nc[i] = e.target.value; setWheelColors(nc); }} style={{ position: "absolute", top: 0, left: 0, width: 28, height: 28, opacity: 0, cursor: "pointer" }} />
                  </div>
                </div>
              ))}
              {wheelColors.length < 8 && (
                <button onClick={() => setWheelColors([...wheelColors, "#64748b"])} style={{ width: 44, height: 44, borderRadius: 10, border: "1.5px dashed #ddd", background: "none", cursor: "pointer", fontSize: 18, color: "#999", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              )}
            </div>
            <ColorPicker label="Couleur du texte sur les segments" value={wheelTextColor} onChange={setWheelTextColor} />
            <div style={{ padding: 14, background: "#f9f9f9", borderRadius: 10, marginTop: 8 }}>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 10, fontWeight: 600 }}>APERÇU DES SEGMENTS</div>
              <div style={{ display: "flex", gap: 4, borderRadius: 8, overflow: "hidden" }}>
                {wheelColors.map((c, i) => (
                  <div key={i} style={{ flex: 1, height: 40, background: c, display: "flex", alignItems: "center", justifyContent: "center", color: wheelTextColor, fontSize: 10, fontWeight: 700 }}>LOT {i+1}</div>
                ))}
              </div>
            </div>
          </div>
        );

      case "footer":
        return (
          <div>
            <div style={s.panelTitle}>Pied de page</div>
            <div style={s.panelDesc}>Configurez le bas de la page de jeu.</div>
            <div style={{ marginBottom: 16 }}>
              <div style={s.fieldLabel}>Texte du pied de page</div>
              <input type="text" value={footerText} onChange={e => setFooterText(e.target.value)} style={s.input} />
            </div>
            <ColorPicker label="Couleur du texte" value={footerColor} onChange={setFooterColor} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, padding: "12px 14px", background: "#f9f9f9", borderRadius: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Lien vers le règlement</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Affiche un lien "Règlement" en bas de page</div>
              </div>
              <div onClick={() => setShowRulesLink(!showRulesLink)} style={{ width: 38, height: 22, borderRadius: 11, background: showRulesLink ? "#059669" : "#ddd", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: showRulesLink ? 18 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              </div>
            </div>
          </div>
        );
    }
  };

  const getBg = () => {
    if (bgType === "gradient") return `linear-gradient(180deg, ${bgGradient1}, ${bgGradient2})`;
    if (bgType === "color") return bgColor;
    return "#2a2151";
  };

  const WheelPreview = () => {
    const segs = wheelColors.length;
    const r = 52, cx = 60, cy = 60;
    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        {wheelColors.map((c, i) => {
          const a1 = (i * 360 / segs - 90) * Math.PI / 180;
          const a2 = ((i + 1) * 360 / segs - 90) * Math.PI / 180;
          const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
          const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
          const large = 360 / segs > 180 ? 1 : 0;
          return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`} fill={c} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />;
        })}
        <circle cx={cx} cy={cy} r="10" fill="#fff" />
        <polygon points="60,4 55,14 65,14" fill="#F5A623" />
      </svg>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", background: "#f5f5f5" }}>
      {/* SIDEBAR NAV */}
      <div style={{ width: 210, background: "#1a1a1a", display: "flex", flexDirection: "column", padding: "20px 0" }}>
        <div style={{ padding: "0 20px 24px", fontSize: 20, fontWeight: 800, color: "#fff", fontStyle: "italic", letterSpacing: 2 }}>CADEO</div>
        {[
          { icon: "🏠", label: "Accueil" },
          { icon: "🎡", label: "Roue Boost", active: true },
          { icon: "⭐", label: "E-réputation" },
          { icon: "👥", label: "Données clients" },
          { icon: "👤", label: "Utilisateurs" },
          { icon: "💬", label: "Assistance" },
        ].map(item => (
          <div key={item.label} style={{ padding: "11px 20px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: item.active ? "#2a2151" : "transparent", color: item.active ? "#fff" : "#999", fontSize: 14, fontWeight: item.active ? 600 : 400, borderLeft: item.active ? "3px solid #F5A623" : "3px solid transparent", transition: "all 0.15s" }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #333" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2a2151", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>E</div>
          <span style={{ color: "#ccc", fontSize: 13 }}>Emilien</span>
          <span style={{ marginLeft: "auto", color: "#666", fontSize: 12 }}>⌃</span>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOP BAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 28px", borderBottom: "1px solid #eee", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1.5px solid #ddd", background: "#fff", fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer" }}>
              ← Retour
            </button>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a" }}>Apparence du jeu</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#999", fontSize: 12 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#059669" }} />
            <span>Sauvegarde automatique</span>
          </div>
        </div>

        {/* EDITOR AREA */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* SECTION TABS (mini sidebar) */}
          <div style={{ width: 72, background: "#fff", borderRight: "1px solid #eee", display: "flex", flexDirection: "column", paddingTop: 8 }}>
            {sections.map(sec => (
              <div key={sec.id} onClick={() => setActiveSection(sec.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "14px 4px", cursor: "pointer", background: activeSection === sec.id ? "#f3f0ff" : "transparent", borderRight: activeSection === sec.id ? "2.5px solid #2a2151" : "2.5px solid transparent", transition: "all 0.15s" }}>
                <span style={{ fontSize: 20 }}>{sec.icon}</span>
                <span style={{ fontSize: 10, fontWeight: activeSection === sec.id ? 700 : 500, color: activeSection === sec.id ? "#2a2151" : "#999", letterSpacing: 0.2 }}>{sec.label}</span>
              </div>
            ))}
          </div>

          {/* EDIT PANEL */}
          <div style={{ width: 360, background: "#fff", borderRight: "1px solid #eee", overflowY: "auto", padding: "24px 22px" }}>
            {renderPanel()}
          </div>

          {/* PREVIEW AREA */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0eff4", position: "relative" }}>
            {/* Grid pattern background */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5 }} />
            
            {/* Phone mockup */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Highlight indicator */}
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#888", background: "#fff", padding: "4px 12px", borderRadius: 20, border: "1px solid #eee" }}>
                  📱 Aperçu en temps réel
                </span>
              </div>
              
              <div style={{ width: 280, background: "#1a1a1a", borderRadius: 32, padding: "12px 10px", boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)" }}>
                {/* Notch */}
                <div style={{ width: 80, height: 5, background: "#333", borderRadius: 10, margin: "0 auto 8px" }} />
                
                {/* Screen */}
                <div style={{ background: getBg(), borderRadius: 22, padding: "28px 20px 18px", minHeight: 480, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }}>
                  
                  {/* Logo */}
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#999", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>LOGO</div>

                  {/* Title */}
                  <div style={{ fontSize: Math.max(titleSize * 0.7, 10), fontWeight: 800, color: titleColor, textAlign: "center", fontStyle: "italic", lineHeight: 1.35, marginBottom: 20, padding: "0 8px", maxWidth: "100%", wordBreak: "break-word" }}>
                    {titleText}
                  </div>

                  {/* Button */}
                  <button style={{ padding: "10px 36px", fontSize: 14, fontWeight: 800, border: "none", background: btnColor, color: btnTextColor, borderRadius: btnRadius, letterSpacing: 1.2, marginBottom: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    {btnText}
                  </button>

                  {/* Wheel */}
                  <div style={{ marginBottom: 16 }}>
                    <WheelPreview />
                  </div>

                  {/* Separator */}
                  <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "auto", paddingTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
                      {showRulesLink && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Règlement</span>}
                      <span style={{ fontSize: 10, color: footerColor, marginLeft: showRulesLink ? 0 : "auto", marginRight: showRulesLink ? 0 : "auto" }}>{footerText}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        input[type="range"] { height: 4px; border-radius: 2px; }
        textarea:focus, input:focus { outline: none; border-color: #2a2151 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

const s = {
  fieldLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1.5px solid #eee",
    fontSize: 14,
    color: "#333",
    background: "#fff",
    transition: "border 0.15s",
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 6,
  },
  panelDesc: {
    fontSize: 13,
    color: "#888",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  uploadZone: {
    border: "2px dashed #ddd",
    borderRadius: 14,
    padding: "28px 20px",
    textAlign: "center",
    background: "#fafafa",
    cursor: "pointer",
    transition: "border-color 0.15s",
  },
  uploadBtn: {
    marginTop: 12,
    padding: "8px 20px",
    borderRadius: 8,
    border: "1.5px solid #ddd",
    background: "#fff",
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    cursor: "pointer",
  },
};

export default AppearanceEditor;
