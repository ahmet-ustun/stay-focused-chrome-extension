<template>
  <div>
    <shared-card>
      <h4>Deactivation Settings</h4>
      <note-block>
        Note: This feature is designed to make deactivation take some effort,
        encouraging you to stay focused and keep working
      </note-block>
      <md-radio v-model="settings.lock.type" value="none">None</md-radio>
      <md-radio v-model="settings.lock.type" value="question"
        >Answering a Question</md-radio
      >
      <md-column v-if="settings.lock.type === 'question'">
        <md-field>
          <label>Number of tries before showing answer</label>
          <md-input
            type="number"
            min="1"
            v-model="settings.lock.questionNumberOfTries"
          ></md-input>
        </md-field>
      </md-column>
      <md-radio v-model="settings.lock.type" value="password"
        >Password
        <tooltip
          >You’ll need to enter the password each time you access the
          settings.</tooltip
        >
      </md-radio>
      <md-column v-if="settings.lock.type === 'password'">
        <md-field>
          <label>Password </label>
          <md-input type="password" v-model="settings.lock.password"></md-input>
        </md-field>
      </md-column>
      <md-radio v-model="settings.lock.type" value="click-button"
        >Click a Button
        <tooltip
          >Requires clicking a button multiple times to unlock the
          extension.</tooltip
        >
      </md-radio>
      <md-column v-if="settings.lock.type === 'click-button'">
        <md-field>
          <label>Number of clicks required to unlock</label>
          <md-input
            type="number"
            min="1"
            v-model="settings.lock.clickButtonCounts"
          ></md-input>
        </md-field>
      </md-column>
    </shared-card>

    <shared-card>
      <h4>
        Work Schedule
        <tooltip
          >Blocks websites during the specified working days and hours.
        </tooltip>
      </h4>
      <note-block type="warning">
        Note: To enable this setting, activate the tool and set your preferred
        working hours/days.
      </note-block>
      <md-switch
        v-model="settings.workHours.enableWorkHours"
        class="md-menu-content-right-end md-primary"
      >
        Active?
      </md-switch>

      <div>
        From:
        <vue-timepicker
          :disabled="!settings.workHours.enableWorkHours"
          format="hh:mm A"
          v-model="settings.workHours.startTime"
        ></vue-timepicker>
        To:
        <vue-timepicker
          :disabled="!settings.workHours.enableWorkHours"
          format="hh:mm A"
          v-model="settings.workHours.endTime"
        ></vue-timepicker>
        <md-column :width="50">
          <md-field>
            <label>Working Days</label>
            <md-select
              v-model="settings.workHours.days"
              name="working-days"
              id="working-days"
              multiple
            >
              <md-option value="0">Sunday</md-option>
              <md-option value="1">Monday</md-option>
              <md-option value="2">Tuesday</md-option>
              <md-option value="3">Wednesday</md-option>
              <md-option value="4">Thursday</md-option>
              <md-option value="5">Friday</md-option>
              <md-option value="6">Saturday</md-option>
            </md-select>
          </md-field>
        </md-column>
      </div>
    </shared-card>

    <shared-card>
      <md-switch
        v-model="settings.allowFunnyGoBackImages"
        class="md-menu-content-right-end md-primary"
      >
        Show funny images to go back to work
      </md-switch>
    </shared-card>
    <shared-card>
      <md-button
        class="md-raised reset-button"
        @click.native="isResetButtonActive = true"
        >Reset Data</md-button
      >
    </shared-card>
    <md-dialog-confirm
      :md-active.sync="isResetButtonActive"
      md-title="Are you sure you want to reset the data?"
      md-content="This will make all your settings and websites return to their initial values."
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel=""
      @md-confirm="onResetConfirm"
    />
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import { settingsDefault } from "../defaults";
import { resetChromeStorageData } from "../helpers";
import { localStorage } from "../chromeApiHelpers";
import SharedCard from "../sharedComponents/SharedCard";
import Tooltip from "../sharedComponents/Tooltip";
import MdColumn from "../sharedComponents/MdColumn";
import NoteBlock from "../sharedComponents/NoteBlock";

export default {
  name: "SettingsTab",
  mounted() {
    this.loadSettings();
  },
  data() {
    return {
      settings: settingsDefault,
      isResetButtonActive: false
    };
  },

  methods: {
    loadSettings() {
      localStorage
        .get("settings")
        .then(settings => {
          this.settings = settings;
        })
        .catch(e => {
          this.saveSettings(); //save default settings(initially default settings will be in data)
        });
    },
    saveSettings() {
      localStorage.set("settings", this.settings);
    },
    onResetConfirm() {
      resetChromeStorageData();
      this.$emit("reload-data");
      this.loadSettings();
    }
  },
  components: {
    NoteBlock,
    MdColumn,
    Tooltip,
    SharedCard,
    VueTimepicker
  },
  watch: {
    settings: {
      handler() {
        this.saveSettings();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.reset-button {
  margin-top: 2%;
}

.time-picker {
  z-index: 6;
}
.md-radio {
  display: flex;
}

.shared-card {
  margin-bottom: 2%;
}
.note {
  color: #fa6d6d;
}
</style>
