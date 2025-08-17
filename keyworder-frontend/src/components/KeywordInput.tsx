type KeywordInputProps = { visible: boolean, disabled: boolean, keyword: string, onChange: (value: string) => void };

export default function KeywordInput({ visible, disabled, keyword, onChange }: KeywordInputProps) {

    if (!visible) return null;

    return (
        <input
            type="text" 
            placeholder="guess keyword" 
            className={`keyword-input ${disabled ? 'disabled' : ''}`}
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled} />
    )
}