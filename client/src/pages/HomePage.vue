<template>
  <div class="container-fluid">
    <section class="row box">
      <div class="col-12 d-flex justify-content-between p-5 ">
        <div>
          <h5 class="funColor">
            Projects
          </h5>
          <p>
            a list of projects for {{ account.name }}
          </p>
        </div>
        <div>
          <button class="btn btn-outline-info funColor">
            Create Project
          </button>
        </div>
      </div>
      <div class="col-12 text-center funColor">
        <section class="row">
          <div class="col-4">
            <p>Name</p>
          </div>
          <div class="col-4 underline">
            <p>Members</p>
          </div>
          <div class="col-4">
            <p>Started</p>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.funColor {
  color: rgb(242, 11, 204);
}
.underline {
  border-bottom: 2px solid grey;
}

.box {
  max-width: 85%;
  max-height: 77vh;
  box-shadow: 0 5px 7px grey;
  border-radius: 13px;
}
</style>
