'use client';
import { useState, useEffect } from 'react';
import styles from './styles/Home.module.css';

const Page = () => {
  const [formData, setFormData] = useState([{ name: '', role: '' }]);
  const [errors, setErrors] = useState<{ name: boolean; role: boolean }[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Indicate that the component has mounted (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering on server-side
  }

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [field]: value };
    setFormData(updatedFormData);
  };

  const handleAddField = () => {
    setFormData([...formData, { name: '', role: '' }]);
    setErrors([...errors, { name: false, role: false }]);
  };

  const handleDeleteField = (index: number) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setErrors(updatedErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = formData.map((field) => ({
      name: !field.name,
      role: !field.role,
    }));
    setErrors(newErrors);

    const isValid = newErrors.every((error) => !error.name && !error.role);
    if (isValid) {
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <div className={styles.container}>
      {/* Label for the form */}
      <h1 className={styles.companyLabel}>6sense Technologies Employee Details</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {formData.map((field, index) => (
          <div key={index} className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor={`name-${index}`} className={styles.label}>
                Name
              </label>
              <input
                id={`name-${index}`}
                type="text"
                value={field.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                placeholder="Enter your name"
                className={styles.input}
              />
              {errors[index]?.name && <p className={styles.errorText}>Name is required</p>}
            </div>
            <div className={styles.formField}>
              <label htmlFor={`role-${index}`} className={styles.label}>
                Role
              </label>
              <select
                id={`role-${index}`}
                value={field.role}
                onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                className={styles.select}
              >
                <option value="">Select your role</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Tester">Tester</option>
              </select>
              {errors[index]?.role && <p className={styles.errorText}>Role is required</p>}
            </div>
            <button
              type="button"
              onClick={() => handleDeleteField(index)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleAddField} className={styles.addButton}>
            Add Field
          </button>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>

      <h3 className={styles.heading}>Submitted Employee Details</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((field, index) => (
            <tr key={index}>
              <td>{field.name || 'N/A'}</td>
              <td>{field.role || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;