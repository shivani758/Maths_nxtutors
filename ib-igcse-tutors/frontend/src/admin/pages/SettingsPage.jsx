import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "../../services/settingsService";
import { AdminPageHeader, LoadingPanel } from "../components/primitives";
import { FieldGroup, FormSection, MediaPickerField, SeoFieldsPanel, formatLineList, parseLineList } from "../forms/primitives";
import { listMedia } from "../../services/mediaService";
import { useAdminToast } from "../providers/AdminToastContext";

function SettingsPage() {
  const { pushToast } = useAdminToast();
  const [settings, setSettings] = useState(null);
  const [media, setMedia] = useState([]);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    Promise.all([getSettings(), listMedia()]).then(([nextSettings, mediaAssets]) => {
      setSettings(nextSettings);
      setMedia(mediaAssets);
    });
  }, []);

  if (!settings) {
    return <LoadingPanel label="Loading settings..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Global brand, contact, footer, and homepage settings live here in a structure that can later map to real CMS configuration endpoints."
        primaryAction={{
          label: "Save settings",
          onClick: async () => {
            await saveSettings(settings);
            pushToast({ title: "Settings saved." });
          },
        }}
      />

      <div className="flex flex-wrap gap-2">
        {[
          { value: "general", label: "General" },
          { value: "contact", label: "Contact" },
          { value: "homepage", label: "Homepage" },
          { value: "branding", label: "Branding" },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeTab === tab.value
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" ? (
        <FormSection title="General Settings" description="Global site identity and footer links.">
          <FieldGroup label="Site Name">
            <input
              value={settings.siteName}
              onChange={(event) => setSettings((current) => ({ ...current, siteName: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Support Email">
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(event) => setSettings((current) => ({ ...current, supportEmail: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Footer Links" fullWidth helpText="Use `Label :: /path` on each line.">
            <textarea
              rows={5}
              value={(settings.footerLinks ?? []).map((item) => `${item.label} :: ${item.href}`).join("\n")}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  footerLinks: parseLineList(event.target.value).map((item) => {
                    const [label, href] = item.split("::");
                    return {
                      label: label.trim(),
                      href: (href || "").trim(),
                    };
                  }),
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
        </FormSection>
      ) : null}

      {activeTab === "contact" ? (
        <FormSection title="Contact Settings" description="Operational contact details used across the public site.">
          <FieldGroup label="Phone Display">
            <input
              value={settings.contact.phoneDisplay}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  contact: { ...current.contact, phoneDisplay: event.target.value },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="WhatsApp Number">
            <input
              value={settings.contact.whatsappNumber}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  contact: { ...current.contact, whatsappNumber: event.target.value },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Support Hours">
            <input
              value={settings.contact.supportHours}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  contact: { ...current.contact, supportHours: event.target.value },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Social Links" fullWidth helpText="Use `platform :: url` on each line.">
            <textarea
              rows={5}
              value={Object.entries(settings.socialLinks ?? {})
                .map(([key, value]) => `${key} :: ${value}`)
                .join("\n")}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  socialLinks: parseLineList(event.target.value).reduce((map, item) => {
                    const [key, value] = item.split("::");
                    return {
                      ...map,
                      [key.trim()]: (value || "").trim(),
                    };
                  }, {}),
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
        </FormSection>
      ) : null}

      {activeTab === "homepage" ? (
        <FormSection title="Homepage Content" description="Lightweight homepage settings that public selectors can read safely.">
          <FieldGroup label="Eyebrow">
            <input
              value={settings.homepage.eyebrow}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  homepage: { ...current.homepage, eyebrow: event.target.value },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Hero Title" fullWidth>
            <input
              value={settings.homepage.heroTitle}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  homepage: { ...current.homepage, heroTitle: event.target.value },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Hero Subtitle" fullWidth>
            <textarea
              rows={4}
              value={settings.homepage.heroSubtitle}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  homepage: { ...current.homepage, heroSubtitle: event.target.value },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
          <FieldGroup label="Keyword Chips" fullWidth helpText="One chip per line.">
            <textarea
              rows={6}
              value={formatLineList(settings.homepage.keywordChips)}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  homepage: { ...current.homepage, keywordChips: parseLineList(event.target.value) },
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </FieldGroup>
        </FormSection>
      ) : null}

      {activeTab === "branding" ? (
        <FormSection title="Branding Assets" description="Choose brand visuals from the seeded media library.">
          <MediaPickerField
            label="Logo Mark"
            value={settings.branding.logoMark}
            onChange={(value) =>
              setSettings((current) => ({
                ...current,
                branding: { ...current.branding, logoMark: value },
              }))
            }
            assets={media}
          />
          <MediaPickerField
            label="Default Hero Image"
            value={settings.branding.defaultHeroImage}
            onChange={(value) =>
              setSettings((current) => ({
                ...current,
                branding: { ...current.branding, defaultHeroImage: value },
              }))
            }
            assets={media}
          />
          <div className="md:col-span-2">
            <SeoFieldsPanel
              value={settings.seo}
              onChange={(seo) => setSettings((current) => ({ ...current, seo }))}
            />
          </div>
        </FormSection>
      ) : null}
    </div>
  );
}

export default SettingsPage;
