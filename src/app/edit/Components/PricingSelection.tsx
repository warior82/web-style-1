"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Edit2, Save, Loader2 } from "lucide-react";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

interface PricingData {
  waNumber: string;
  section: {
    tag: string;
    title: string;
    description: string;
  };
  plans: PricingPlan[];
}

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  type?: "text" | "textarea";
}

const EditableField = ({
  value,
  onChange,
  isEditing,
  type = "text",
}: EditableFieldProps) => {
  if (!isEditing) return <span>{value}</span>;

  if (type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded bg-background text-foreground"
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded bg-background text-foreground"
    />
  );
};

export const PricingSection = () => {
  const [data, setData] = useState<PricingData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<PricingData | null>(null);
  const [isSaving, setIsSaving] = useState(false); // NEW: loading state

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        if (json && !json.error) {
          setData(json);
          setEditedData(json);
        } else {
          console.error("Error in pricing data:", json.error);
        }
      })
      .catch((err) => console.error("Error fetching pricing:", err));
  }, []);

  const handleSave = async () => {
    if (!editedData) return;

    try {
      setIsSaving(true); // mulai loading
      const response = await fetch("/api/pricing/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      setData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false); // selesai loading
    }
  };

  if (!data || !editedData) return null;

  const currentData = isEditing ? editedData : data;

  return (
    <section className="w-full px-8 py-20 bg-background relative">
      {/* Overlay Loading */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-white" size={40} />
            <p className="text-white text-lg font-medium">Menyimpan...</p>
          </div>
        </div>
      )}

      {/* Edit/Save Button */}
      <button
        onClick={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
        disabled={isSaving}
        className="absolute top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
      </button>

      <div className="max-w-6xl mx-auto text-center mb-12">
        {/* Nomor WA hanya muncul saat mode edit */}
        {isEditing && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              value={currentData.waNumber}
              onChange={(e) =>
                setEditedData((prev) =>
                  prev ? { ...prev, waNumber: e.target.value } : prev
                )
              }
              className="w-full p-2 border rounded bg-background text-foreground"
            />
          </div>
        )}

        <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
          <EditableField
            value={currentData.section.tag}
            onChange={(value) =>
              setEditedData((prev) =>
                prev ? { ...prev, section: { ...prev.section, tag: value } } : prev
              )
            }
            isEditing={isEditing}
          />
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          <EditableField
            value={currentData.section.title}
            onChange={(value) =>
              setEditedData((prev) =>
                prev
                  ? { ...prev, section: { ...prev.section, title: value } }
                  : prev
              )
            }
            isEditing={isEditing}
          />
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          <EditableField
            value={currentData.section.description}
            onChange={(value) =>
              setEditedData((prev) =>
                prev
                  ? { ...prev, section: { ...prev.section, description: value } }
                  : prev
              )
            }
            isEditing={isEditing}
            type="textarea"
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {currentData.plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-lg border flex flex-col justify-between ${
              plan.highlight
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-card-foreground border-border"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-2">
              <EditableField
                value={plan.title}
                onChange={(value) =>
                  setEditedData((prev) => {
                    if (!prev) return prev;
                    const newPlans = [...prev.plans];
                    newPlans[idx] = { ...newPlans[idx], title: value };
                    return { ...prev, plans: newPlans };
                  })
                }
                isEditing={isEditing}
              />
            </h3>
            <p className="text-lg mb-4 opacity-80">
              <EditableField
                value={plan.description}
                onChange={(value) =>
                  setEditedData((prev) => {
                    if (!prev) return prev;
                    const newPlans = [...prev.plans];
                    newPlans[idx] = { ...newPlans[idx], description: value };
                    return { ...prev, plans: newPlans };
                  })
                }
                isEditing={isEditing}
                type="textarea"
              />
            </p>
            <div className="text-3xl font-bold mb-6">
              <EditableField
                value={plan.price}
                onChange={(value) =>
                  setEditedData((prev) => {
                    if (!prev) return prev;
                    const newPlans = [...prev.plans];
                    newPlans[idx] = { ...newPlans[idx], price: value };
                    return { ...prev, plans: newPlans };
                  })
                }
                isEditing={isEditing}
              />
            </div>
            <ul className="space-y-3 text-left mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check
                    size={18}
                    className={`${
                      plan.highlight
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`}
                  />
                  <EditableField
                    value={feature}
                    onChange={(value) =>
                      setEditedData((prev) => {
                        if (!prev) return prev;
                        const newPlans = [...prev.plans];
                        const newFeatures = [...newPlans[idx].features];
                        newFeatures[i] = value;
                        newPlans[idx] = {
                          ...newPlans[idx],
                          features: newFeatures,
                        };
                        return { ...prev, plans: newPlans };
                      })
                    }
                    isEditing={isEditing}
                  />
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${currentData.waNumber}?text=Halo,%20saya%20tertarik%20dengan%20paket%20${plan.title}%20dengan%20harga%20${plan.price}.%20Mohon%20info%20lebih%20lanjut.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-4 rounded-md font-medium transition-all text-center mt-auto ${
                plan.highlight
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              Pilih Paket
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
