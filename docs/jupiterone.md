# Probely Integration with JupiterOne

## Probely + JupiterOne Integration Benefits

- Visualize Probely targets, findings, and users in the JupiterOne graph.
- Monitor changes to Probely users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches targets, findings, and users from Probely to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires an Access Token. You need permission to create a user in
  Probely that will be used to obtain the token.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Probely

1. Get Access Token
   - From the login server, you can obtain the access token.
     1. Setup the `.env` file with the appropriate credentials as well as
        account type.
     2. Start the login server.
     3. Once you access on the browser, there should be a link to
        `Get Probely Access Token`. Click on it.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Probely** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Probely
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Probely Access Token** generated for use by JupiterOne.

1. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Probely** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources | Entity `_type`    | Entity `_class` |
| --------- | ----------------- | --------------- |
| Account   | `probely_account` | `Account`       |
| Finding   | `probely_finding` | `Finding`       |
| Target    | `probely_target`  | `Application`   |
| User      | `probely_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `probely_account`     | **HAS**               | `probely_target`      |
| `probely_account`     | **HAS**               | `probely_user`        |
| `probely_target`      | **HAS**               | `probely_finding`     |
| `probely_user`        | **ASSIGNED**          | `probely_finding`     |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
