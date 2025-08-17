type AttemptsProps = { attemptsRemaining: number };

export default function Attempts({ attemptsRemaining }: AttemptsProps) {

    attemptsRemaining = Math.max(attemptsRemaining, 0);
    return (
        <div>Attempts left: {"x ".repeat(attemptsRemaining)}</div>
    )
}