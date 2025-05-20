import React from 'react';
import { toast } from 'react-toastify';
import { resetScores } from '../../api/scores';
import * as styles from './moderatorcontrols.module.css';

export const ModeratorControls = ({
  session,
  showScores,
  toggleScores,
  pointOption,
  nextPointOption,
  updatePointOption,
}) => {
  const [isModerator, setIsModerator] = React.useState(false);

  React.useEffect(() => {
    if (isModerator) {
      toast('Enabled Moderator controls!');
    }
  }, [isModerator]);

  const reset = React.useCallback(() => {
    updatePointOption(false);
    toggleScores(false); // Only change visuals
    resetScores(session);
  }, [session, toggleScores]);

  if (!isModerator) {
    return (
      <span
        className={styles.moderator_notice}
        onClick={() => setIsModerator(true)}
      >
        click to enable moderator controls
      </span>
    );
  }

  return (
    <div className={styles.actions}>
      <div>
        <div
          classname={styles.reveal}
          onclick={() =>
            window.confirm(`${showScores ? 'Hide' : 'Reveal'} all cards?`) &&
            toggleScores(true)
          }
        >
          {showScores ? 'Hide' : 'Reveal'}
        </div>
        <div
          classname={styles.reset}
          onclick={() => window.confirm('Reset all cards?') && reset()}
        >
          Reset
        </div>
      </div>
      <div>
        <div
          classname={styles.points}
          onclick={() =>
            window.confirm(
              `Change point options to ${nextPointOption(pointOption)}?`,
            ) && updatePointOption(true)
          }
        >
          {nextPointOption(pointOption)}
        </div>
      </div>
    </div>
  );
};
