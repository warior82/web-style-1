"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save } from "lucide-react";

interface ProfileData {
  section: {
    tag: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    description: string[];
  };
}

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  type?: "text" | "textarea";
}

const EditableField = ({ value, onChange, isEditing, type = "text" }: EditableFieldProps) => {
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

export const ProfileSection = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch("/json/ProfileSection.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        if (json && !json.error) {
          setData(json);
          setEditedData(json);
        } else {
          console.error("Error in profile data:", json.error);
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleSave = async () => {
    if (!editedData) return;

    try {
      console.log('Saving data:', editedData);
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server response:', responseData);
        throw new Error(responseData.error || 'Failed to save changes');
      }

      setData(editedData);
      setIsEditing(false);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (!data || !editedData) return null;

  const currentData = isEditing ? editedData : data;

  return (
    <section className="w-full px-8 py-16 bg-muted/30 relative">
      {/* Edit/Save Button */}
      <button
        onClick={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Gambar / showcase */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          {isEditing ? (
            <EditableField
              value={currentData.section.imageUrl}
              onChange={(value) =>
                setEditedData(prev =>
                  prev ? {
                    ...prev,
                    section: { ...prev.section, imageUrl: value }
                  } : prev
                )
              }
              isEditing={isEditing}
            />
          ) : (
            <img
              src={currentData.section.imageUrl}
              alt={currentData.section.imageAlt}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Deskripsi Profil */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
            <EditableField
              value={currentData.section.tag}
              onChange={(value) =>
                setEditedData(prev =>
                  prev ? {
                    ...prev,
                    section: { ...prev.section, tag: value }
                  } : prev
                )
              }
              isEditing={isEditing}
            />
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            <EditableField
              value={currentData.section.title}
              onChange={(value) =>
                setEditedData(prev =>
                  prev ? {
                    ...prev,
                    section: { ...prev.section, title: value }
                  } : prev
                )
              }
              isEditing={isEditing}
            />
          </h2>
          {currentData.section.description.map((paragraph, idx) => (
            <div key={idx} className="mb-4 last:mb-6">
              <EditableField
                value={paragraph}
                onChange={(value) => {
                  setEditedData(prev => {
                    if (!prev) return prev;
                    const newDescription = [...prev.section.description];
                    newDescription[idx] = value;
                    return {
                      ...prev,
                      section: { ...prev.section, description: newDescription }
                    };
                  });
                }}
                isEditing={isEditing}
                type="textarea"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
