import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  dice: number[] = [1, 1, 1, 1, 1]; 
  locked: boolean[] = [false, false, false, false, false]; 
  rollCount: number = 0; 
  maxRolls: number = 3; 
  rollingIntervals: any[] = []; 
  rollDice() {
    if (this.rollCount < this.maxRolls) {
      this.rollCount++;
      this.clearRollingIntervals();
      this.dice.forEach((_, index) => {
        if (!this.locked[index]) {
          const interval = setInterval(() => {
            this.dice[index] = Math.floor(Math.random() * 6) + 1;
          }, 50);
          setTimeout(() => {
            clearInterval(interval);
          }, 500 + (index * 500)); 
          this.rollingIntervals.push(interval);
        }
      });
    }
  }

  toggleLock(index: number) {
    this.locked[index] = !this.locked[index]; 
  }

  clearRollingIntervals() {
    this.rollingIntervals.forEach(interval => clearInterval(interval));
    this.rollingIntervals = [];
  }
  isRollDisabled(): boolean {
    return this.rollCount >= this.maxRolls;
  }

  resetGame() {
    this.dice = [1, 1, 1, 1, 1];
    this.locked = [false, false, false, false, false]; 
    this.rollCount = 0;
    this.clearRollingIntervals(); 
  }
}
